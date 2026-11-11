import { Join } from "../Join";

export const HomeHero = () => (
  <section>
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] text-ink-soft shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Peer-to-peer · powered by WebRTC
    </span>
    <h1 className="mt-5 font-display text-5xl font-bold leading-tight md:text-6xl">
      Video calls that start <span className="text-gradient">in one click.</span>
    </h1>
    <p className="mt-5 max-w-md text-sm text-ink-soft">
      Create a room, share the link, and talk face to face. No downloads,
      no sign-up — media flows directly between browsers.
    </p>
    <div className="mt-8">
      <Join />
    </div>
  </section>
);
