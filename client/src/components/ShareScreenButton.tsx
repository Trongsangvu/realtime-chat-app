import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { ControlButton } from "./common/ControlButton";

interface ShareScreenButtonProps {
  onClick: () => void;
  active?: boolean;
}

export const ShareScreenButton = ({ onClick, active }: ShareScreenButtonProps) => (
  <ControlButton onClick={onClick} label="Share screen" active={active}>
    <ComputerDesktopIcon className="h-5 w-5" />
  </ControlButton>
);
