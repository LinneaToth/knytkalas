type Props = {
  children: React.ReactNode;
};

export default function AboutCard({ children }: Props) {
  return (
    <div className="bg-card-background mx-auto flex max-w-sm flex-1 flex-col items-center gap-5 rounded-3xl p-10 text-center">
      {children}
    </div>
  );
}
