import Logo from "./Logo";
import Button from "../../../ui/components/Button";
import { SignOutButton } from "@/features/auth/components/SignOutButton";

type Props = {
  mode: "signedin" | "notSignedIn" | "onboarding";
};

export default function NavBar({ mode = "notSignedIn" }: Props) {
  return (
    <header
      className="bg-primary-darker fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between px-8 py-8 shadow-md"
      id="top"
    >
      <Logo />

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
