"use client";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push("/");
  };

  return (
    <div
      className="font-bagel flex cursor-pointer items-center text-3xl tracking-wide"
      onClick={goTop}
    >
      <span className="mr-2">🥦</span>
      <span
        data-text="Knytkalas"
        className="text-secondary relative z-10 before:absolute before:top-0 before:left-0 before:-z-10 before:content-[attr(data-text)] before:[-webkit-text-stroke:6px_white]"
      >
        Knytkalas
      </span>
    </div>
  );
}
