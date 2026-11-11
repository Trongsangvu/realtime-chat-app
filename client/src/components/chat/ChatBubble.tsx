import classNames from "classnames";
import { useContext } from "react";
import { RoomContext } from "../../context/RoomContext";
import { UserContext } from "../../context/UserContext";
import { IMessage } from "../../types/chat";

interface ChatBubbleProps {
  message: IMessage;
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const { peers } = useContext(RoomContext);
  const { userId } = useContext(UserContext);

  const author = message.author && peers[message.author]?.userName;
  const userName = author || "Anonymous";
  const isSelf = message.author === userId;

  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={classNames("flex flex-col", isSelf ? "items-end" : "items-start")}>
      <div className="mb-0.5 text-[11px] font-medium text-ink-soft">
        {isSelf ? "You" : userName}
      </div>
      <div
        className={classNames(
          "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-sm",
          isSelf
            ? "btn-gradient rounded-br-md text-white"
            : "rounded-bl-md bg-white shadow-sm"
        )}
      >
        {message.content}
        <div
          className={classNames("mt-0.5 text-[10px]", isSelf ? "text-white/70" : "text-ink-soft")}
        >
          {time}
        </div>
      </div>
    </div>
  );
};
