"use client";

import { useState } from "react";
import Logo from "./Logo";
import Button from "../../../ui/components/Button";
import { SignOutButton } from "@/features/auth/components/SignOutButton";
import { Menu, X } from "lucide-react";

type Props = {
  mode: "signedin" | "notSignedIn" | "onboarding";
};

export default function NavBar({ mode = "notSignedIn" }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={`${
        mode === "signedin" ? "bg-primary" : "bg-background"
      } fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between px-5 shadow-md transition-all duration-500 ease-in-out sm:px-8`}
      id="top"
    >
      <Logo outline={mode === "signedin"} />

      {mode === "notSignedIn" && (
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" href="/login">
            log in
          </Button>
          <span className="hidden md:inline">
            <Button variant="cta" href="/onboarding">
              sign up
            </Button>
          </span>
        </nav>
      )}

      {/*Desktop menu*/}
      {mode === "signedin" && (
        <>
          <nav className="border-card-background/70 mr-auto ml-5 hidden justify-start gap-3 border-l pl-5 lg:flex">
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

          <div className="hidden lg:block">
            <SignOutButton />
          </div>

          {/*mobile menu btn*/}
          <button
            className="flex items-center justify-center p-2 text-current lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X color="white" /> : <Menu color="white" />}
          </button>

          {/*Mobile drop down*/}
          {isMobileMenuOpen && (
            <div
              className="bg-primary border-card-background/20 absolute top-16 left-0 flex w-full flex-col gap-4 border-t px-5 py-6 shadow-xl md:px-35 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <nav className="flex flex-col gap-3">
                <Button
                  href="/dashboard/events"
                  variant="ghost"
                  className="w-full text-left"
                >
                  Events
                </Button>
                <Button
                  href="/dashboard/events/create"
                  variant="ghost"
                  className="w-full text-left"
                >
                  Create event
                </Button>
                <Button
                  href="/dashboard/profile"
                  variant="ghost"
                  className="w-full text-left"
                >
                  Profile
                </Button>
              </nav>
              <hr className="border-card-background/20" />
              <div className="w-full">
                <SignOutButton />
              </div>
            </div>
          )}
        </>
      )}
    </header>
  );
}
