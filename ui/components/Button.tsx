import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "icon";
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "destructive"
    | "dark"
    | "light"
    | "ghost";
  href?: string;
  onClick?: () => void;
  width?: "full" | null;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  size = "md",
  variant = "secondary",
  href = "",
  onClick,
  width,
  className,
  disabled = false,
  loading = false,
  ...props
}: Props) {
  let styling =
    " border font-medium  transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/35 cursor-pointer active:scale-95 flex flex-row gap-3 items-center justify-center text-center rounded-full disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none ";

  if (width === "full") styling += " w-full ";
  switch (size) {
    case "sm":
      styling += " px-4 py-2 text-sm ";
      break;
    case "md":
      styling += " px-6 py-3 text-base ";
      break;
    case "lg":
      styling += " px-8 py-4 text-lg ";
      break;
    case "icon":
      styling += " h-11 w-11 md:h-9 md:w-9 p-0 shrink-0 ";
      break;
  }

  switch (variant) {
    case "primary":
      styling += ` border-transparent bg-accent text-accent-foreground shadow-[0_6px_16px_-4px_rgba(48,76,137,0.35)] hover:-translate-y-[1px] hover:rotate-[-1deg] hover:shadow-[0_12px_24px_-8px_rgba(48,76,137,0.45)] `;
      break;
    case "secondary":
      styling +=
        " border-primary-darkest text-primary-darkest hover:bg-primary-darkest/10 ";
      break;
    case "tertiary":
      styling +=
        "  border-transparent bg-transparent text-primary-darkest underline underline-offset-4 hover:opacity-70 ";
      break;
    case "destructive":
      styling +=
        " border-transparent bg-secondary text-foreground hover:brightness-105 ";
      break;
    case "dark":
      styling +=
        " border-transparent bg-primary-darkest text-foreground-light shadow-[0_6px_16px_-4px_rgba(48,76,137,0.35)] hover:-translate-y-[1px] hover:rotate-[-1deg] ";
      break;
    case "light":
      styling +=
        " border-transparent bg-white text-foreground shadow-[0_2px_10px_-3px_rgba(48,76,137,0.3)] hover:-translate-y-[1px] hover:shadow-[0_6px_16px_-6px_rgba(48,76,137,0.4)] ";
      break;
    case "ghost":
      styling +=
        " border-transparent bg-white/45 text-foreground hover:bg-white/65 ";
      break;
  }

  const combinedStyling = styling + (className ? " " + className : "");
  const isDisabled = disabled || loading;

  if (href)
    return (
      <Link
        href={href}
        className={combinedStyling}
        onClick={onClick}
        aria-disabled={disabled}
        aria-busy={loading}
      >
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className={combinedStyling}
      aria-busy={loading}
      aria-disabled={disabled}
      disabled={isDisabled}
      {...props}
    >
      {loading && <LoaderCircle size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
