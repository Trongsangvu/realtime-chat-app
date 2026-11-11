import { ArrowLeftIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { NameInput } from "../common/name";
import { UserContext } from "../context/UserContext";
import { Avatar } from "./Avatar";
import { Button } from "./common/Button";
import { MediaControls } from "./MediaControls";
import { VideoPlayer } from "./VideoPlayer";

interface LobbyProps {
  roomId?: string;
  stream?: MediaStream;
  micOn: boolean;
  camOn: boolean;
  onToggleMic: () => void;
  onToggleCam: () => void;
  onJoin: () => void;
}

export const Lobby = ({
  roomId = "",
  stream,
  micOn,
  camOn,
  onToggleMic,
  onToggleCam,
  onJoin,
}: LobbyProps) => {
  const { userName, userId } = useContext(UserContext);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable (insecure context) – ignore */
    }
  };

  const hasCamera = !!stream && stream.getVideoTracks().length > 0;
  const showAvatar = !hasCamera || !camOn;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6">
      <header className="relative flex items-center justify-center">
        <Link
          to="/"
          className="absolute left-0 flex items-center gap-1 text-xs text-brand-600 hover:underline"
        >
          <ArrowLeftIcon className="h-3 w-3" /> Back
        </Link>
        <span className="font-display text-sm font-bold">Huddle</span>
      </header>

      <main className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1fr_320px]">
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-indigo-100 to-violet-100 shadow-card">
          <div className={showAvatar ? "invisible" : "h-full w-full"}>
            <VideoPlayer
              stream={stream}
              mirror
            />
          </div>

          {showAvatar && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-xs text-ink-soft">
              <Avatar
                name={userName || "You"}
                seed={userId || "you"}
              />
              {!stream
                ? "Waiting for camera permission…"
                : !hasCamera
                  ? "No camera found"
                  : "Camera is off"}
            </div>
          )}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
            <MediaControls
              micOn={micOn}
              camOn={camOn}
              onToggleMic={onToggleMic}
              onToggleCam={onToggleCam}
            />
          </div>
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold">
            Ready to <span className="text-gradient">join?</span>
          </h1>
          <p className="mt-1 text-xs text-rose-500">Check your camera and mic first.</p>

          <div className="glass mt-6 flex items-center justify-between rounded-xl p-3">
            <div className="min-w-0">
              <div className="text-[10px] text-ink-soft">Room code</div>
              <div className="truncate font-mono text-sm font-semibold">{roomId}</div>
            </div>
            <Button
              variant="secondary"
              onClick={copyLink}
              className="px-3 py-1.5 text-xs"
            >
              <ClipboardIcon className="h-3.5 w-3.5" />
              {copied ? "Copied!" : "Copy link"}
            </Button>
          </div>

          <label className="mt-5 block text-[11px] text-ink-soft">
            Your name
            <div className="mt-1">
              <NameInput onEnter={onJoin} />
            </div>
          </label>

          <Button
            onClick={onJoin}
            testId="join-button"
            className="mt-5 w-full py-3 text-sm"
          >
            Join now
          </Button>
        </div>
      </main>
    </div>
  );
};
