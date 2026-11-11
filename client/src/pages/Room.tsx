import { PhoneXMarkIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chat } from "../components/chat/Chat";
import { ChatButton } from "../components/ChatButton";
import { ControlButton } from "../components/common/ControlButton";
import { Lobby } from "../components/Lobby";
import { MediaControls } from "../components/MediaControls";
import { ShareScreenButton } from "../components/ShareScreenButton";
import { VideoPlayer } from "../components/VideoPlayer";
import { VideoTile } from "../components/VideoTile";
import { ChatContext } from "../context/ChatContext";
import { RoomContext } from "../context/RoomContext";
import { UserContext } from "../context/UserContext";
import { useMediaToggles } from "../hooks/useMediaToggles";
import { PeerState } from "../reducers/peerReducer";
import { formatElapsed } from "../utils/formatElapsed";
import { ws } from "../ws";

export const Room = () => {
  const { id } = useParams();
  const {
    stream,
    screenStream,
    peers,
    shareScreen,
    screenSharingId,
    setRoomId,
  } = useContext(RoomContext);

  const { userName, userId } = useContext(UserContext);
  const { toggleChat, chat } = useContext(ChatContext);
  const { micOn, camOn, toggleMic, toggleCam } = useMediaToggles(stream);

  const [joined, setJoined] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (joined && stream)
      ws.emit("join-room", { roomId: id, peerId: userId, userName });
  }, [joined, id, userId, stream, userName]);

  useEffect(() => {
    setRoomId(id || "");
  }, [id, setRoomId]);

  useEffect(() => {
    if (!joined) return;
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, [joined]);

  const leave = () => {
    // A full navigation closes the socket + peer connection and releases the camera.
    window.location.assign("/");
  };

  if (!joined) {
    return (
      <Lobby
        roomId={id}
        stream={stream}
        micOn={micOn}
        camOn={camOn}
        onToggleMic={toggleMic}
        onToggleCam={toggleCam}
        onJoin={() => setJoined(true)}
      />
    );
  }

  const screenSharingVideo =
    screenSharingId === userId
      ? screenStream
      : peers[screenSharingId]?.stream;

  const { [screenSharingId]: sharing, ...peersToShow } = peers;
  const remotePeers = Object.values(peersToShow as PeerState).filter(
    (peer) => !!peer.stream
  );

  const tiles = (
    <>
      {screenSharingId !== userId && (
        <VideoTile
          stream={stream}
          name={userName ? `${userName} (You)` : "You"}
          seed={userId}
          cameraOff={!camOn}
          micOff={!micOn}
          mirror
          className="min-h-[220px]"
        />
      )}
      {remotePeers.map((peer) => (
        <VideoTile
          key={peer.peerId}
          stream={peer.stream}
          name={peer.userName}
          seed={peer.peerId}
          muted={false}
          className="min-h-[220px]"
        />
      ))}
    </>
  );

  return (
    <div className="flex h-screen flex-col px-4 pb-4 pt-3">
      <header className="flex items-center justify-between px-2 pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-bold">Huddle</span>
          <span className="h-3 w-px bg-ink/20" />
          <span className="font-mono text-ink-soft">{id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
            {formatElapsed(elapsed)}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm">
            <UsersIcon className="h-3.5 w-3.5" />
            {Object.keys(peers).length + 1}
          </span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 gap-4">
        {screenSharingVideo ? (
          <>
            <div className="min-w-0 flex-1 overflow-hidden rounded-3xl bg-black shadow-glass">
              <VideoPlayer stream={screenSharingVideo} className="!object-contain" />
            </div>
            <div className="flex w-56 shrink-0 flex-col gap-4 overflow-y-auto">
              {tiles}
            </div>
          </>
        ) : (
          <div
            className="grid min-w-0 flex-1 auto-rows-fr gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
          >
            {tiles}
          </div>
        )}

        {chat.isChatOpen && (
          <aside className="glass w-80 shrink-0 overflow-hidden rounded-3xl">
            <Chat />
          </aside>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <div className="glass flex items-center gap-3 rounded-full px-4 py-2.5">
          <MediaControls
            micOn={micOn}
            camOn={camOn}
            onToggleMic={toggleMic}
            onToggleCam={toggleCam}
          />
          <ShareScreenButton
            onClick={shareScreen}
            active={screenSharingId === userId && !!screenSharingId}
          />
          <ChatButton onClick={toggleChat} active={chat.isChatOpen} />
          <ControlButton onClick={leave} label="Leave call" danger>
            <PhoneXMarkIcon className="h-5 w-5" />
          </ControlButton>
        </div>
      </div>
    </div>
  );
};
