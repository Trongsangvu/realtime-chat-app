import { Logo } from "../Logo";

export const HomeHeader = () => (
  <header className="flex items-center justify-between">
    <Logo />
    <nav className="flex gap-6 text-xs text-brand-600">
      <a href="#how" className="hover:underline">How it works</a>
      <a href="#how" className="hover:underline">Privacy</a>
      <a href="https://github.com" className="hover:underline">GitHub</a>
    </nav>
  </header>
);
