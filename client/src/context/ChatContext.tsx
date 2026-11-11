import { createContext, useEffect, useReducer } from "react";
import { addHistoryAction, addMessageAction, toggleChatAction } from "../reducers/chatActions";
import { ChatState, chatReducer } from "../reducers/chatReducer";
import { IMessage } from "../types/chat";
import { ws } from "../ws";

interface ChatValue {
  chat: ChatState;
  sendMessage: (message: string, roomId: string, author: string) => void;
  toggleChat: () => void;
}

interface ChatProviderProps {
  children: React.ReactNode;
}

const initialChatState: ChatState = {
  messages: [],
  isChatOpen: false,
};

export const ChatContext = createContext<ChatValue>({
  chat: initialChatState,
  sendMessage: () => { },
  toggleChat: () => { },
});

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chat, chatDispatch] = useReducer(chatReducer, {
    messages: [],
    isChatOpen: false,
  });

  const sendMessage = (message: string, roomId: string, author: string) => {
    const messageData: IMessage = {
      content: message,
      timestamp: new Date().getTime(),
      author
    };

    chatDispatch(addMessageAction(messageData));

    ws.emit("send-message", roomId, messageData);
  };

  const addMessage = (message: IMessage) => {
    console.log("new message", message);
    chatDispatch(addMessageAction(message));
  };

  const addHistory = (messages: IMessage[]) => {
    chatDispatch(addHistoryAction(messages));
  };

  const toggleChat = () => {
    chatDispatch(toggleChatAction(!chat.isChatOpen));
  };

  useEffect(() => {
    ws.on("add-message", addMessage);
    ws.on("get-message", addHistory);

    return () => {
      ws.off("add-message", addMessage);
      ws.off("get-message", addHistory);
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chat,
        sendMessage,
        toggleChat,
      }}>
      {children}
    </ChatContext.Provider>
  );
};