import classNames from "classnames";

const palettes = [
  "from-indigo-500 to-indigo-700",
  "from-emerald-500 to-emerald-700",
  "from-orange-400 to-orange-700",
  "from-violet-500 to-violet-700",
  "from-sky-500 to-sky-700",
  "from-pink-500 to-pink-700",
];

export const tilePalettes = [
  "from-indigo-50 to-indigo-100",
  "from-emerald-50 to-emerald-100",
  "from-orange-50 to-orange-100",
  "from-violet-50 to-violet-100",
  "from-sky-50 to-sky-100",
  "from-pink-50 to-pink-100",
];

export const hashIndex = (seed: string) =>
  Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0) % palettes.length;

export const initials = (name: string) =>
  (name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 3) || "?").toUpperCase();

interface AvatarProps {
  name: string;
  seed: string;
  className?: string;
}

export const Avatar = ({ name, seed, className }: AvatarProps) => (
  <div
    className={classNames(
      "flex items-center justify-center rounded-full bg-gradient-to-br text-white font-display font-bold shadow-xl",
      palettes[hashIndex(seed)],
      className ?? "h-20 w-20 text-2xl"
    )}
  >
    {initials(name)}
  </div>
);
