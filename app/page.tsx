import { OneTapButton } from "@/app/components/authentication/OneTapButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <OneTapButton clientId={process.env.CLIENT_ID!} />
    </div>
  );
}
