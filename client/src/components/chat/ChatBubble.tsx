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
  const userName = author || "Anonynmous";
  const isSelf = message.author === userId;

  const time = new Date(message.timestamp).toLocaleTimeString();

  return (

    <div className={classNames("m-2 flex", {
      "pl-1 justify-end": isSelf,
      "pl-1 justify-start": !isSelf,
    })}
    >
      <div className="flex flex-col">
        <div className={classNames("inline-block py-2 px-4 rounded", {
          "bg-red-200": isSelf,
          "bg-red-300": !isSelf,
        })}
        >
          {message.content}
          <div>
            <div className={classNames("text-xs opacity-50", {
              "text-right": isSelf,
              "text-left": !isSelf,
            })}
            >
              {time}
            </div>
          </div>
        </div>
      </div>
      <div className={classNames("text-md", {
        "text-right": isSelf,
        "text-left": !isSelf,
      })}
      >
        {isSelf ? "You" : userName}</div>
      {/* {isSelf ? "You" : userName.toString()}</div> */}
    </div>
  );
};