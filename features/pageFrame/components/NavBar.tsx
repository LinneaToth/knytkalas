import Logo from "./Logo";
import Button from "../../../ui/components/Button";
import { SignOutButton } from "@/features/auth/components/SignOutButton";

type Props = {
  mode: "signedin" | "notSignedIn" | "onboarding";
};

export default function NavBar({ mode = "notSignedIn" }: Props) {
  return (
    <header
      className={`${mode === "signedin" ? "bg-primary" : "bg-background"} fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between px-5 shadow-md sm:px-8`}
      id="top"
    >
      <Logo outline={mode === "signedin"} />

      {mode === "notSignedIn" && (
        <>
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            <Button variant="ghost" href="/login">
              log in
            </Button>
            <Button variant="cta" href="/onboarding">
              sign up
            </Button>
          </div>

          <div className="sm:hidden">
            <Button variant="ghost" href="/login">
              log in
            </Button>
          </div>
        </>
      )}

      {mode === "signedin" && (
        <>
          <nav className="border-card-background/70 mr-auto ml-5 flex justify-start gap-3 border-l pl-5">
            <Button href="/dashboard/events" variant="ghost">
              Events
            </Button>
            <Button href="/dashboard/events/create" variant="ghost">
              Create event
            </Button>
            <Button href="/dashboard/profile" variant="ghost">
              Profile
            </Button>
          </nav>
          <nav className="items-self-end">
            <SignOutButton />
          </nav>
        </>
      )}
    </header>
  );
}
