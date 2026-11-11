import { useContext } from "react";
import { UserContext } from "../context/UserContext";

interface NameInputProps {
  onEnter?: () => void;
}

export const NameInput = ({ onEnter }: NameInputProps) => {
  const { userName, setUserName } = useContext(UserContext);
  return (
    <input
      className="w-full rounded-lg border border-brand-100 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-ink-soft/60 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      placeholder="How others will see you"
      aria-label="Your name"
      onChange={(e) => setUserName(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      value={userName}
    />
  );
};
