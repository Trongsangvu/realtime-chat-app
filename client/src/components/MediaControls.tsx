import { MicrophoneIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { ControlButton } from "./common/ControlButton";

interface MediaControlsProps {
  micOn: boolean;
  camOn: boolean;
  onToggleMic: () => void;
  onToggleCam: () => void;
}

export const MediaControls = ({
  micOn,
  camOn,
  onToggleMic,
  onToggleCam,
}: MediaControlsProps) => (
  <>
    <ControlButton
      onClick={onToggleMic}
      off={!micOn}
      label={micOn ? "Mute microphone" : "Unmute microphone"}
      testId="mic-button"
    >
      <MicrophoneIcon className="h-5 w-5" />
    </ControlButton>
    <ControlButton
      onClick={onToggleCam}
      off={!camOn}
      label={camOn ? "Turn off camera" : "Turn on camera"}
      testId="camera-button"
    >
      <VideoCameraIcon className="h-5 w-5" />
    </ControlButton>
  </>
);
