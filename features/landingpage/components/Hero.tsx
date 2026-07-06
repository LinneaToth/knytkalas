import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="h-[95vh] bg-accent flex flex-col items-center justify-center">
      <p>TEMPORARY BUTTON DISPLAY</p>
      <div className="p-7 bg-card-background">
        <Button variant="solid">Type Solid</Button>
        <Button variant="outline">Type Outline</Button>
        <Button variant="ghost">Type ghost</Button>
        <Button variant="cta">Type CTA</Button>
      </div>
    </section>
  );
}
