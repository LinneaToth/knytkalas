type Props = {
  children: React.ReactNode;
};

export default function AboutCard({ children }: Props) {
  return (
    <div className="transform-all bg-card-background mx-auto flex max-w-sm flex-1 flex-col items-center gap-5 rounded-xl p-10 text-center transition-transform duration-300 select-none hover:scale-105 hover:shadow-[0_12px_24px_-8px_rgba(48,76,137,0.1)]">
      {children}
    </div>
  );
}
