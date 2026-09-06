"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Button from "../../../ui/components/Button";
import { SignOutButton } from "@/features/auth/components/SignOutButton";
import { Menu, X } from "lucide-react";

type Props = {
  mode: "signedin" | "notSignedIn" | "onboarding";
};

export default function NavBar({ mode = "notSignedIn" }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard/events",
      label: "Events",
      active:
        pathname.startsWith("/dashboard/events") &&
        pathname !== "/dashboard/events/create",
    },
    {
      href: "/dashboard/events/create",
      label: "Create event",
      active: pathname === "/dashboard/events/create",
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      active: pathname.startsWith("/dashboard/profile"),
    },
  ];

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
          <Button variant="light" href="/login" size="sm">
            log in
          </Button>
          <Button variant="primary" href="/onboarding" size="sm">
            sign up
          </Button>
        </nav>
      )}

      {/*Desktop menu*/}
      {mode === "signedin" && (
        <>
          <nav className="border-card-background/70 mr-auto ml-5 hidden justify-start gap-3 border-l pl-5 lg:flex">
            {navItems.map((item) => (
              <Button
                key={item.href}
                href={item.href}
                variant={item.active ? "light" : "ghost"}
                size="sm"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <SignOutButton />
          </div>

          {/*mobile menu btn*/}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/45 hover:cursor-pointer lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/*Mobile drop down*/}
          {isMobileMenuOpen && (
            <div
              className="bg-primary border-card-background/20 absolute top-16 left-0 flex w-full flex-col gap-4 border-t px-5 py-6 shadow-xl md:px-35 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    href={item.href}
                    variant={item.active ? "light" : "ghost"}
                    size="sm"
                    className="w-full"
                  >
                    {item.label}
                  </Button>
                ))}
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
