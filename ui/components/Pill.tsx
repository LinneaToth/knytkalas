import { ReactNode } from "react";

type Tone = "neutral" | "success" | "error" | "info" | "accent";
type Variant = "filled" | "soft" | "dot";

type Props = {
  children: ReactNode;
  tone?: Tone;
  variant?: Variant;
  icon?: ReactNode;
  size?: "xs" | "sm";
  className?: string;
};

const TONE: Record<Tone, { filled: string; soft: string }> = {
  neutral: {
    filled: "bg-inactive text-foreground-light",
    soft: "bg-inactive/10 text-foreground ring-1 ring-inset ring-inactive/25",
  },
  success: {
    filled: "bg-success text-success-foreground",
    soft: "bg-success/15 text-foreground ring-1 ring-inset ring-success/45",
  },
  error: {
    filled: "bg-error text-secondary-foreground",
    soft: "bg-error/12 text-foreground ring-1 ring-inset ring-error/45",
  },
  info: {
    filled: "bg-primary-darkest text-foreground-light",
    soft: "bg-primary-darkest/10 text-foreground ring-1 ring-inset ring-primary-darkest/30",
  },
  accent: {
    filled: "bg-accent text-accent-foreground",
    soft: "bg-accent/25 text-accent-foreground ring-1 ring-inset ring-accent/60",
  },
};

const DOT: Record<Tone, string> = {
  neutral: "bg-inactive",
  success: "bg-success",
  error: "bg-error",
  info: "bg-primary-darkest",
  accent: "bg-accent",
};

export default function Pill({
  children,
  tone = "neutral",
  variant = "soft",
  icon,
  size = "sm",
  className = "",
}: Props) {
  const sizeCls =
    size === "xs" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  let shellCls: string;
  let dot: string | null = null;

  if (variant === "dot") {
    shellCls =
      "bg-foreground/5 text-foreground ring-1 ring-inset ring-foreground/10";
    dot = DOT[tone];
  } else {
    shellCls = TONE[tone][variant];
  }

  return (
    <span
      className={`inline-flex h-fit items-center gap-1.5 rounded-full font-medium whitespace-nowrap ${sizeCls} ${shellCls} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />}
      {!dot && icon}
      {children}
    </span>
  );
}
