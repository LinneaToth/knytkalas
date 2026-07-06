import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "s" | "m" | "l";
  variant?: "solid" | "outline" | "ghost" | "cta" | "success";
  href?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  size = "m",
  variant = "solid",
  href = "",
  onClick,
}: Props) {
  let styling =
    "lowercase border-1 font-semibold transition-colors duration-300 focus:outline-none cursor-pointer active:scale-95 ";

  switch (size) {
    case "s":
      styling += "px-2 py-1 text-sm ";
      break;
    case "m":
      styling += "px-4 py-2 text-base ";
      break;
    case "l":
      styling += "px-6 py-3 text-lg ";
      break;
  }

  switch (variant) {
    case "solid":
      styling +=
        " border-transparent bg-secondary text-white hover:brightness-95";
      break;
    case "outline":
      styling += " border-foreground text-foreground hover:bg-foreground/5";
      break;
    case "ghost":
      styling +=
        " border-transparent bg-white/50 text-foreground hover:bg-white/70";
      break;
    case "cta":
      styling +=
        " border-transparent bg-accent text-accent-foreground hover:brightness-95";
    case "success":
      styling +=
        " border-transparent bg-success text-foreground hover:brightness-95";
      break;
  }

  if (href)
    return (
      <Link href={href} className={styling}>
        {children}
      </Link>
    );

  return (
    <button onClick={onClick ? onClick : undefined} className={styling}>
      {children}
    </button>
  );
}
