import { NameInput } from "../common/name";
import { ws } from "../ws";
import { Button } from "./common/Button";

export const Join = () => {
  // Join button
  // Join Room
  const createRoom = () => {
    ws.emit("create-room");
  };

  return (
    <div className="flex flex-col">
      <NameInput />
      <Button
        onClick={createRoom}
        className="py-2 px-8 text-xl">
        Start new meeting
      </Button>
    </div>
  );
};