"use client";

const goTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.location.replace("/");
};

export default function Logo() {
  return (
    <div
      className="flex items-center font-bagel text-3xl tracking-wide cursor-pointer"
      onClick={goTop}>
      <span className="mr-2">🥦</span>
      <span
        data-text="Knytkalas"
        className="relative z-10 text-secondary before:content-[attr(data-text)] before:absolute before:left-0 before:top-0 before:-z-10 before:[-webkit-text-stroke:6px_white]">
        Knytkalas
      </span>
    </div>
  );
}
