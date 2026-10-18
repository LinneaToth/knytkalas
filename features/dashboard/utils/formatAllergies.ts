import { IssueType } from "@/generated/prisma";

const ANIMAL_ISSUES: IssueType[] = [
  "MEAT",
  "DAIRY",
  "LACTOSE",
  "EGG",
  "FISH",
  "SHELLFISH",
];

export const formatAllergies = (allergies: IssueType[]): string[] => {
  const isVegan = ANIMAL_ISSUES.every((issue) => allergies.includes(issue));
  if (!isVegan) return allergies;

  //Keep the non-animal allergies (gluten, nuts) next to the vegan pill
  const otherAllergies = allergies.filter(
    (allergy) => allergy !== "ANIMALBASED" && !ANIMAL_ISSUES.includes(allergy),
  );
  return ["VEGAN", ...otherAllergies];
};
