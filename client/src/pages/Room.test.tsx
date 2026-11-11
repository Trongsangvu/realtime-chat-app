import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Room } from "./Room";
import { ChatProvider } from "../context/ChatContext";
import { RoomContext } from "../context/RoomContext";
import { MemoryRouter } from "react-router-dom";

const joinCall = () => fireEvent.click(screen.getByTestId("join-button"));

test("chat button toggles chat", () => {
  render(
    <MemoryRouter>
      <ChatProvider>
        <Room />
      </ChatProvider>
    </MemoryRouter>
  );
  joinCall();

  const chatButton = screen.getByTestId("chat-button");
  fireEvent(
    chatButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );

  const textarea = screen.getByRole("textbox");
  expect(textarea).toBeInTheDocument();
});

const customRender = (ui: any, providerProps = {}) => {
  const defaultProps = {
    value: {
      peers: {
        'qew': {
          stream: {} as MediaStream,
          userName: "",
          peerId: 'qewew',
        },
        'qewwgh': {
          stream: {} as MediaStream,
          userName: "",
          peerId: 'qewewq',
        },
        'qeqghw': {
          stream: {} as MediaStream,
          userName: "",
          peerId: 'qewewqa',
        },
      },
      screenSharingId: "",
      shareScreen: () => { },
      setRoomId: () => { },
      roomId: "q",
    },
  };
  const props = { ...defaultProps, ...providerProps };
  return render(
    <MemoryRouter>
      <RoomContext.Provider {...props}>{ui}</RoomContext.Provider>
    </MemoryRouter>
  );
};

test("room page renders video for every peer", () => {
  customRender(<Room />, {});
  joinCall();
  const videos = screen.getAllByTestId("peer-video");
  expect(videos).toHaveLength(3);
});
