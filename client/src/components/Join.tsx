import { LockClosedIcon, PlusIcon } from "@heroicons/react/24/outline";
import { SubmitEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ws } from "../ws";
import { Button } from "./common/Button";

export const Join = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const createRoom = () => {
    ws.emit("create-room");
  };

  const joinRoom = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Accept either a bare code or a full invite link.
    const value = code.trim().split("/").filter(Boolean).pop();
    if (value) navigate(`/room/${value}`);
  };

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Button onClick={createRoom} className="w-full py-3.5 text-sm">
        <PlusIcon className="h-4 w-4" />
        Start new meeting
      </Button>

      <div className="flex items-center gap-3 text-xs text-ink-soft">
        <span className="h-px flex-1 bg-brand-100" />
        or join with a code
        <span className="h-px flex-1 bg-brand-100" />
      </div>

      <form onSubmit={joinRoom} className="flex gap-3">
        <label className="flex flex-1 items-center gap-2 rounded-xl border border-brand-100 bg-white px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
          <LockClosedIcon className="h-4 w-4 text-brand-500" />
          <input
            className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-ink-soft/60"
            placeholder="Enter room code, e.g. abc-defg-hij"
            aria-label="Room code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        <Button type="submit" variant="secondary" disabled={!code.trim()}>
          Join
        </Button>
      </form>
    </div>
  );
};
