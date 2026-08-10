"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/graphics/logo.svg";

export default function Logo() {
  const router = useRouter();

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push("/");
  };

  return (
    <div
      className="font-bagel flex cursor-pointer items-center gap-3 text-3xl tracking-wide"
      onClick={goTop}
    >
      <Image
        src={logo}
        alt="Site Logo"
        className="object-contain"
        width={30}
        height={30}
      />
      <span
        data-text="Knytkalas"
        className="text-secondary font-bagel relative z-10 before:absolute before:top-0 before:left-0 before:-z-10 before:content-[attr(data-text)] before:[-webkit-text-stroke:4px_white]"
      >
        Knytkalas
      </span>
    </div>
  );
}
