import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "s" | "m" | "l";
  variant?: "solid" | "outline" | "ghost" | "cta" | "success" | "dark";
  href?: string;
  onClick?: () => void;
  width?: "full" | null;
}

export default function Button({
  children,
  size = "m",
  variant = "solid",
  href = "",
  onClick,
  width,
  ...props
}: Props) {
  let styling =
    " border-2 font-medium transition-all duration-300 focus:outline-none cursor-pointer active:scale-95 flex flex-row gap-5 items-center justify-center text-center rounded-full hover:-translate-y-1 hover:shadow-lg ";

  if (width === "full") styling += " w-full ";
  switch (size) {
    case "s":
      styling += "px-4 py-1 text-sm ";
      break;
    case "m":
      styling += "px-6 py-2 text-base ";
      break;
    case "l":
      styling += "px-8 py-3 text-lg ";
      break;
  }

  switch (variant) {
    case "solid":
      styling +=
        " border-transparent bg-secondary text-secondary-foreground hover:brightness-110";
      break;
    case "outline":
      styling +=
        " border-foreground text-foreground hover:bg-foreground hover:text-background";
      break;
    case "ghost":
      styling +=
        " border-transparent bg-white/50 text-foreground hover:bg-white/70";
      break;
    case "cta":
      styling +=
        " border-transparent bg-accent text-accent-foreground hover:brightness-110";
      break;
    case "success":
      styling +=
        " border-transparent bg-success text-foreground hover:brightness-110";
      break;
    case "dark":
      styling +=
        " border-transparent bg-primary-darkest text-foreground-light hover:brightness-110";
      break;
  }

  if (href)
    return (
      <Link href={href} className={styling}>
        {children}
      </Link>
    );

  return (
    <button onClick={onClick} className={styling} {...props}>
      {children}
    </button>
  );
}
