import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { ControlButton } from "./common/ControlButton";

interface ChatButtonProps {
  onClick: () => void;
  active?: boolean;
}

export const ChatButton = ({ onClick, active }: ChatButtonProps) => (
  <ControlButton
    onClick={onClick}
    testId="chat-button"
    label="Chat"
    active={active}
  >
    <ChatBubbleLeftRightIcon className="h-5 w-5" />
  </ControlButton>
);
