import Link from "next/link";
import Button from "./ui/Button";
import { SignOutButton } from "@/features/auth/components/SignOutButton";

type Props = {
  mode: "signedin" | "notSignedIn" | "onboarding";
};

export default function NavBar({ mode = "notSignedIn" }: Props) {
  return (
    <header
      className="w-full bg-primary-darker h-16 fixed top-0 left-0 z-50 flex items-center justify-between px-8 py-8 shadow-md"
      id="top">
      <Link href="/#top">
        <div className="flex items-center font-bagel text-3xl tracking-wide">
          <span className="mr-2">🥦</span>
          <span
            data-text="Knytkalas"
            className="relative z-10 text-secondary before:content-[attr(data-text)] before:absolute before:left-0 before:top-0 before:-z-10 before:[-webkit-text-stroke:6px_white]">
            Knytkalas
          </span>
        </div>
      </Link>

      {mode === "notSignedIn" && (
        <div className="flex items-center gap-4">
          <Button variant="ghost" href="/login">
            log in
          </Button>
          <Button variant="solid" href="/onboarding">
            sign up
          </Button>
        </div>
      )}

      <SignOutButton />
    </header>
  );
}
