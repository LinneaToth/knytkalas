import Button from "@/ui/components/Button";
import FeatureHeadline from "@/ui/components/FeatureHeadline";

export default function JoinTheParty() {
  return (
    <div className="bg-card-background mt-10 flex max-w-2xl flex-col items-center justify-center gap-5 self-center rounded-2xl p-10 pt-15 text-center">
      <FeatureHeadline size="large" extraStyling="-mt-22 mb-5">
        Join the party
      </FeatureHeadline>
      <p className="max-w-3xl">
        All you need to do to get started is to sign up with your existing
        Google account.
      </p>{" "}
      <Button variant="cta" size="l" href="/onboarding">
        sign up
      </Button>{" "}
      <p className="max-w-3xl">
        It really is <span className="italic">that easy</span>! Welcome to
        Knytkalas!
      </p>
    </div>
  );
}
