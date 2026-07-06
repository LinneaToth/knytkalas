import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <>
      <div className="absolute w-screen h-screen bg-[url('/graphics/bg.svg')] bg-cover bg-center "></div>
      <section className="z-10 h-screen mt-15 flex flex-col items-center justify-center ">
        <div className="p-7 gap-3 flex w-full">
          <Button variant="cta" size="l">
            create event
          </Button>
          <a href="#about">
            <Button variant="outline" size="l">
              read more
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
