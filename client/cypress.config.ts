import { defineConfig } from "cypress";
import { WS } from "./src/ws"
import socketIOClient from "socket.io-client";
import type { Socket } from "socket.io-client";

interface JoinRoomData {
  roomId: string;
  peerId: string;
  userName: string;
}

interface EmitData {
  event: string;
  roomId: string;
  eventData: unknown;
}

let ws: Socket | undefined;

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        connect() {
            ws = socketIOClient(WS);

          return null;
        },
        joinRoom(data: JoinRoomData) {
          const {roomId, peerId, userName} = data;
          ws?.emit("join-room", {
            roomId,
            peerId,
            userName,
          });
          return null;
        },
        emit(data: EmitData) {
          const {event, roomId, eventData} = data;
          ws?.emit(event, roomId, eventData);
          return null;
        }
      });
    },
  },
});
