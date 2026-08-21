"use client";
import { useLayoutEffect, useRef } from "react";
import ContentBox from "./ContentBox";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function InfoModal({ children, isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialogNode = dialogRef.current;
    if (!dialogNode) return;

    if (isOpen) {
      dialogNode.showModal();
    } else {
      dialogNode.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="backdrop:bg-background/70 m-auto bg-transparent p-0 backdrop:backdrop-blur-sm"
    >
      <button
        onClick={onClose}
        className="text-foreground absolute top-5 right-5 cursor-pointer"
      >
        <X />
      </button>
      <ContentBox styling="max-w-5xl max-h-[85vh] overflow-y-auto gap-5">
        {children}
      </ContentBox>
    </dialog>
  );
}
