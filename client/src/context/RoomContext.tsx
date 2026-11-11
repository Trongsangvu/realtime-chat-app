import Peer from "peerjs";
import { createContext, ReactNode, useContext, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAllPeersAction, addPeerNameAction, addPeerStreamAction, removePeerStreamAction } from "../reducers/peerActions";
import { peersReducer, PeerState } from "../reducers/peerReducer";
import { IPeer } from "../types/peer";
import { ws } from "../ws";
import { UserContext } from "./UserContext";

interface RoomValue {
  stream?: MediaStream;
  screenStream?: MediaStream;
  peers: PeerState;
  shareScreen: () => void;
  roomId: string;
  setRoomId: (id: string) => void;
  screenSharingId: string;
}

interface participantsProps {
  participants: Record<string, IPeer>;
}

export const RoomContext = createContext<RoomValue>({
  peers: {},
  shareScreen: () => { },
  setRoomId: (id) => { },
  screenSharingId: "",
  roomId: "",
});

interface ChildProps {
  children: ReactNode;
}

if (!!window.Cypress) {
  window.Peer = Peer;
}

/**
 * Get camera + mic, degrading gracefully when a device is missing or denied
 * (NotFoundError / NotAllowedError). Falls back to audio-only, video-only,
 * then an empty stream so the user can still join and watch/listen.
 */
const getLocalStream = async (): Promise<MediaStream> => {
  const attempts: MediaStreamConstraints[] = [
    { video: true, audio: true },
    { video: false, audio: true },
    { video: true, audio: false },
  ];
  for (const constraints of attempts) {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      console.warn("getUserMedia failed", constraints, error);
    }
  }
  return new MediaStream();
};

export const RoomProvider = ({ children }: ChildProps) => {
  const navigate = useNavigate();
  const { userName, userId } = useContext(UserContext);
  const [peers, dispatch] = useReducer(peersReducer, {});

  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [screenStream, setScreenStream] = useState<MediaStream>();
  const [screenSharingId, setScreenSharingId] = useState("");
  const [roomId, setRoomId] = useState("");

  const enterRoom = ({ roomId }: { roomId: "string"; }) => {
    navigate(`/room/${roomId}`);
  };

  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());

  const getUsers = ({ participants }: participantsProps) => {
    // console.log({participants});
    dispatch(addAllPeersAction(participants));
  };

  const removePeer = (peerId: string) => {
    dispatch(removePeerStreamAction(peerId));
  };

  const switchStream = (stream: MediaStream) => {
    const videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) return;

    setScreenSharingId(me?.id || "");

    peerConnectionsRef.current.forEach((pc) => {
      const sender = pc.getSenders().find(s => s.track?.kind === "video");

      if (sender) {
        sender.replaceTrack(videoTrack).catch(console.error);
      }
    });
  };

  const shareScreen = () => {
    if (screenSharingId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(switchStream);
    } else {
      navigator.mediaDevices.getDisplayMedia({}).then((stream) => {
        switchStream(stream);
        setScreenStream(stream);
        console.log('Screen sharing ID:', screenSharingId);
      });
    }
  };

  const nameChangedHandler = ({ peerId, userName }: {
    peerId: string,
    userName: string;
  }) => {
    dispatch(addPeerNameAction(peerId, userName));
  };

  useEffect(() => {
    ws.emit("change-name", { peerId: userId, userName, roomId });
  }, [userName, userId, roomId]);

  useEffect(() => {
    const peer = new Peer(userId, {
      // // host: "13.210.68.104",
      // host: "localhost",
      // port: 9000,
      // // port: 80,
      // path: "/"
      host: process.env.REACT_APP_PEER_HOST || "localhost",
      port: process.env.REACT_APP_PEER_PORT ? parseInt(process.env.REACT_APP_PEER_PORT) : 9000,
      path: process.env.REACT_APP_PEER_PATH || "/",
      secure: process.env.REACT_APP_PEER_SECURE === "true"
    });
    setMe(peer);

    getLocalStream().then(setStream);
    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
    ws.on("user-disconnected", removePeer);
    ws.on("user-started-sharing", (peerId) => setScreenSharingId(peerId));
    ws.on("user-stopped-sharing", () => setScreenSharingId(""));
    ws.on("name-changed", nameChangedHandler);

    return () => {
      ws.off("room-created");
      ws.off("get-users");
      ws.off("user-disconnected");
      ws.off("user-started-sharing");
      ws.off("user-stopped-sharing");
      ws.off("user-joined");
      ws.off("name-changed");
      me?.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (screenSharingId) {
      ws.emit("stat-sharing", { peerId: screenSharingId, roomId });
    } else {
      ws.emit("stop-sharing");
    }
  }, [screenSharingId, roomId]);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;
    ws.on("user-joined", ({ peerId, userName: name }) => {
      const call = me.call(peerId, stream, {
        metadata: {
          userName,
        },
      });

      call.on("stream", (peerStream) => {
        dispatch(addPeerStreamAction(peerId, peerStream));
      });
      dispatch(addPeerNameAction(peerId, name));
    });

    me.on("call", (call) => {
      const { userName } = call.metadata;
      dispatch(addPeerNameAction(call.peer, userName));
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerStreamAction(call.peer, peerStream));
      });
    });

    return () => {
      ws.off("user-joined");
    };

  }, [me, stream, userName]);

  return (
    <RoomContext.Provider
      value={{
        stream,
        screenStream,
        peers,
        shareScreen,
        roomId,
        setRoomId,
        screenSharingId,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};



