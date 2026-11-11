import classNames from "classnames";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  testId?: string;
  type?: "submit" | "button" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  ariaLabel?: string;
}

const variants = {
  primary:
    "btn-gradient text-white shadow-card hover:brightness-110 active:brightness-95",
  secondary:
    "bg-white text-brand-600 border border-brand-100 hover:bg-brand-50",
  danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-300/50",
};

export const Button = ({
  children,
  onClick,
  testId,
  className,
  type = "button",
  variant = "primary",
  disabled,
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      type={type}
      data-testid={testId}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classNames(
        "inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-5 py-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
