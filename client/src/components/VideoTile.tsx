import { MicrophoneIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Avatar, hashIndex, tilePalettes } from "./Avatar";
import { VideoPlayer } from "./VideoPlayer";

interface VideoTileProps {
  stream?: MediaStream;
  name?: string;
  seed: string;
  muted?: boolean;
  /** Camera disabled → show avatar instead of video. */
  cameraOff?: boolean;
  micOff?: boolean;
  mirror?: boolean;
  className?: string;
}

export const VideoTile = ({
  stream,
  name,
  seed,
  muted = true,
  cameraOff,
  micOff,
  mirror,
  className,
}: VideoTileProps) => {
  const showAvatar = !stream || stream.getVideoTracks().length === 0 || cameraOff;

  return (
    <div
      className={classNames(
        "relative overflow-hidden rounded-3xl bg-gradient-to-b shadow-glass border border-white/70",
        tilePalettes[hashIndex(seed)],
        className
      )}
    >
      <div className={classNames("absolute inset-0", showAvatar && "invisible")}>
        <VideoPlayer
          stream={stream}
          muted={muted}
          mirror={mirror}
        />
      </div>

      {showAvatar && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Avatar
            name={name || "?"}
            seed={seed}
            className="h-24 w-24 text-3xl"
          />
        </div>
      )}

      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-medium shadow-sm">
        {micOff && <MicrophoneIcon className="h-3 w-3 text-rose-500" />}
        {name || "Guest"}
      </div>
    </div>
  );
};
