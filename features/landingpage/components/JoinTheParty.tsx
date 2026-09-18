import Button from "@/ui/components/Button";
import FeatureHeadline from "@/ui/components/FeatureHeadline";
import { PartyPopper } from "lucide-react";

export default function JoinTheParty() {
  return (
    <div className="bg-card-background mt-10 flex w-full flex-col items-center justify-center gap-5 self-center p-10 pt-15 text-center">
      <FeatureHeadline size="large" extraStyling="-mt-22 mb-5">
        Join the party
      </FeatureHeadline>
      <p className="max-w-3xl">
        One tap with your Google account and you are in!
      </p>{" "}
      <Button variant="primary" size="lg" href="/onboarding" hoverMove={true}>
        <PartyPopper /> sign up
      </Button>{" "}
      <p className="max-w-3xl">
        It really is <span className="italic">that</span> easy! Welcome to
        Knytkalas!
      </p>
    </div>
  );
}
