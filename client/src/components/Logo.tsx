import { VideoCameraIcon } from "@heroicons/react/24/solid";

export const Logo = () => (
  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-lg btn-gradient text-white">
      <VideoCameraIcon className="h-4 w-4" />
    </span>
    <span className="font-display text-lg font-bold">Huddle</span>
  </div>
);
