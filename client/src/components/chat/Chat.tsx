import { useContext, useEffect, useRef } from "react";
import { IMessage } from "../../types/chat";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { ChatContext } from "../../context/ChatContext";

export const Chat = () => {
  const { chat } = useContext(ChatContext);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [chat.messages.length]);

  return (
    <div className="flex h-full flex-col" data-testid="chat">
      <div className="border-b border-brand-100 px-4 py-3 text-sm font-semibold">
        In-call messages
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {chat.messages.length === 0 && (
          <p className="pt-6 text-center text-xs text-ink-soft">
            No messages yet. Say hi!
          </p>
        )}
        {chat.messages.map((message: IMessage) => (
          <ChatBubble
            message={message}
            key={message.timestamp + (message?.author || "Sang")}
          />
        ))}
        <div ref={endRef} />
      </div>
      <ChatInput />
    </div>
  );
};
