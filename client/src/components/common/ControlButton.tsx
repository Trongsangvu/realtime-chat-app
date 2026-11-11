import classNames from "classnames";

interface ControlButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  testId?: string;
  /** Highlighted (e.g. sharing / chat open). */
  active?: boolean;
  /** Draws a strike-through, e.g. mic muted. */
  off?: boolean;
  danger?: boolean;
}

export const ControlButton = ({
  onClick,
  children,
  label,
  testId,
  active,
  off,
  danger,
}: ControlButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testId}
    aria-label={label}
    title={label}
    aria-pressed={active || off}
    className={classNames(
      "relative flex items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
      danger
        ? "h-12 w-16 bg-rose-500 text-white shadow-lg shadow-rose-300/60 hover:bg-rose-600"
        : "h-11 w-11 shadow-sm",
      !danger && active && "bg-brand-500 text-white",
      !danger && !active && off && "bg-rose-100 text-rose-600",
      !danger && !active && !off && "bg-white text-ink hover:bg-brand-50"
    )}
  >
    <span className="h-5 w-5 flex items-center justify-center">{children}</span>
    {off && (
      <span className="absolute h-0.5 w-6 -rotate-45 rounded bg-rose-600" />
    )}
  </button>
);
