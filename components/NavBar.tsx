import Button from "./ui/Button";

export default function NavBar() {
  return (
    <header className="w-full bg-primary h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center font-bagel text-2xl tracking-wide">
        <span className="mr-2">🥦</span>

        {/* The Outer Stroke Trick */}
        <span
          data-text="Knytkalas"
          className="relative z-10 text-secondary before:content-[attr(data-text)] before:absolute before:left-0 before:top-0 before:-z-10 before:[-webkit-text-stroke:6px_white]">
          Knytkalas
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost">log in</Button>
        <Button variant="solid">sign up</Button>
      </div>
    </header>
  );
}
