import { EventData } from "@/types/entityTypes";

export const borderColor = (event: EventData): string => {
  const month = event.date.getMonth();

  if (event.deletedAt) {
    return "border-l-inactive";
  }

  const borderClasses = {
    primary: "border-l-primary",
    success: "border-l-success",
    accent: "border-l-accent",
    secondary: "border-l-secondary",
  };

  if (month < 3 || month === 11) return borderClasses.primary;
  if (month < 6) return borderClasses.success;
  if (month < 9) return borderClasses.accent;
  return borderClasses.secondary;
};
