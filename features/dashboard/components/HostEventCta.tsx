export default function HostEventCta() {
  return (
    <>
      <nav
        className={`bg-card-background text-foreground mt-10 flex cursor-pointer flex-col items-center justify-center rounded-xl py-10 drop-shadow`}
      >
        <div className="from-primary to-primary-darker flex size-20 items-center justify-center rounded-full bg-radial-[at_25%_25%] text-8xl text-white">
          +
        </div>
        <span className="text-foreground mt-5">Create new event!</span>
      </nav>
    </>
  );
}
