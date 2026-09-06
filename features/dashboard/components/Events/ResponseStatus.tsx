import Pill from "@/ui/components/Pill";
import { Check, Hourglass, X, Crown } from "lucide-react";

type Props = {
  status?: "GOING" | "PENDING" | "DECLINED";
  isHost?: boolean;
  perspective?: "self" | "other";
};

export default function ResponseStatus({
  status = "PENDING",
  isHost = false,
  perspective = "other",
}: Props) {
  const self = perspective === "self";

  if (isHost)
    return (
      <Pill tone="info" variant="filled" icon={<Crown size={12} />}>
        You host
      </Pill>
    );

  if (status === "GOING")
    return (
      <Pill tone="success" variant="soft" icon={<Check size={12} />}>
        {self ? "You're going" : "Going"}
      </Pill>
    );

  if (status === "DECLINED")
    return (
      <Pill tone="error" variant="soft" icon={<X size={12} />}>
        {self ? "Can't make it" : "Declined"}
      </Pill>
    );

  return (
    <Pill
      tone={self ? "accent" : "neutral"}
      variant={self ? "filled" : "soft"}
      icon={<Hourglass size={12} />}
    >
      {self ? "Needs your answer" : "Pending"}
    </Pill>
  );
}
