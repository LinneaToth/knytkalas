import type { DietaryRestriction } from "../types/types.js";

export const formatDietaryRestrictions = (
  restrictions: DietaryRestriction[] = [],
) => {
  const resObj = {
    dairy: false,
    gluten: false,
    nuts: false,
    shellfish: false,
    soy: false,
    egg: false,
    honey: false,
    meat: false,
    fish: false,
  };
  const validRestrictions: DietaryRestriction[] = [
    "dairy",
    "gluten",
    "nuts",
    "shellfish",
    "soy",
    "egg",
    "honey",
    "meat",
    "fish",
  ];

  validRestrictions.forEach((res) => {
    if (restrictions.includes(res)) {
      resObj[res] = true;
    }
  });

  return resObj;
};
