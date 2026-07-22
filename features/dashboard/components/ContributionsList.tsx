"use client";

import { getContributionsByEvent } from "../services/getContributionsByEvent";
import { useState } from "react";

type Props = {
  contributions: Awaited<ReturnType<typeof getContributionsByEvent>>;
};

export default function ContributionsList({ contributions }: Props) {
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
  //EXPAND TO SEE WHO BROUGHT IT, DESCRIPTION AND ALLERGENS
  //SORT BY CATEGORY OR GUEST NAME
  //FILTER BY USER'S ALLERGIES VS ALLERGENS
}
