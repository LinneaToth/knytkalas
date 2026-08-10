import Logo from "./Logo";
import Button from "../../../ui/components/Button";

type Props = {
  mode: "signedin" | "notSignedIn" | "onboarding";
};

export default function NavBar({ mode = "notSignedIn" }: Props) {
  return (
    <header
      className="bg-background fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between px-5 py-8 shadow-md sm:px-8"
      id="top"
    >
      <Logo />

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
    </header>
  );
}
