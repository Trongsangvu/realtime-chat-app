import { MicrophoneIcon, PhoneXMarkIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { Avatar, hashIndex, tilePalettes } from "../Avatar";

const previewTiles = [
  { name: "Ana", label: "Ana" },
  { name: "Kofi", label: "Kofi · speaking", speaking: true },
  { name: "Mei", label: "Mei" },
  { name: "You", label: "You" },
];

export const PreviewCall = () => (
  <div className="glass rounded-3xl p-4" aria-hidden="true">
    <div className="grid grid-cols-2 gap-3">
      {previewTiles.map((t) => (
        <div
          key={t.name}
          className={`relative flex h-36 items-center justify-center rounded-2xl bg-gradient-to-b 
            ${tilePalettes[hashIndex(t.name)]} ${t.speaking ? "ring-2 ring-emerald-500" : ""}`}
        >
          <Avatar
            name={t.name}
            seed={t.name}
            className="h-14 w-14 text-lg"
          />
          <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-medium">
            {t.label}
          </span>
        </div>
      ))}
    </div>
    <div className="mt-4 flex items-center justify-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
        <MicrophoneIcon className="h-4 w-4" />
      </span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
        <VideoCameraIcon className="h-4 w-4" />
      </span>
      <span className="flex h-9 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-md">
        <PhoneXMarkIcon className="h-4 w-4" />
      </span>
    </div>
  </div>
);
