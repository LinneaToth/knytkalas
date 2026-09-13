"use client";

import { useState } from "react";
import PrivacyModal from "./PrivacyModal";
import AboutModal from "./AboutModal";
import TermsModal from "./TermsModal";

type ModalState = "privacy" | "about" | "terms" | null;

export default function Footer() {
  const [modalState, setModalState] = useState<ModalState>(null);

  return (
    <>
      <footer className="bg-primary-darkest text-foreground-light flex h-32 w-full flex-col items-center justify-between px-8 py-8 shadow-md md:h-20 md:flex-row md:items-center">
        <nav className="pb-3 md:pb-0">
          <button
            className="hover:text-accent cursor-pointer px-3 md:px-6"
            onClick={() => setModalState("privacy")}
          >
            Privacy
          </button>
          <button
            className="hover:text-accent cursor-pointer px-3 md:px-6"
            onClick={() => setModalState("terms")}
          >
            Terms
          </button>
          <button
            className="hover:text-accent cursor-pointer px-3 md:px-6"
            onClick={() => setModalState("about")}
          >
            About
          </button>
        </nav>
        <span>© {new Date().getFullYear()} Knytkalas.net</span>
      </footer>

      <PrivacyModal
        isOpen={modalState === "privacy"}
        onClose={() => setModalState(null)}
      />

      <AboutModal
        isOpen={modalState === "about"}
        onClose={() => setModalState(null)}
      />

      <TermsModal
        isOpen={modalState === "terms"}
        onClose={() => setModalState(null)}
      />
    </>
  );
}
