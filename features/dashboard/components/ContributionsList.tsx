"use client";

import { getContributionsByEvent } from "../services/getContributionsByEvent";
import { useState } from "react";

export default function ContributionsList({
  contributions,
}: {
  contributions: Awaited<ReturnType<typeof getContributionsByEvent>>;
}) {
  const [sortBy, setSortBy] = useState<"guestName" | "categories">("guestName");

  return (
    <ul>
      <h3>Contributions:</h3>
      {contributions.map((contribution) => (
        <li key={contribution.inviteId}>
          {contribution.contribution.name} -{" "}
          {contribution.contribution.servings} servings
        </li>
      ))}
    </ul>
  );
}
