import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { RoomContext } from "../../context/RoomContext";
import { UserContext } from "../../context/UserContext";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useContext(ChatContext);
  const { userId } = useContext(UserContext);
  const { roomId } = useContext(RoomContext);

  return (
    <form
      className="border-t border-brand-100 p-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!message.trim()) return;
        sendMessage(message, roomId, userId);
        setMessage("");
      }}
    >
      <div className="flex items-end gap-2">
        <textarea
          rows={1}
          placeholder="Send a message"
          className="max-h-28 flex-1 resize-none rounded-xl border border-brand-100 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          value={message}
        />
        <button
          type="submit"
          data-testid="send-msg-button"
          aria-label="Send message"
          className="btn-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-card transition hover:brightness-110"
        >
          <PaperAirplaneIcon className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};
