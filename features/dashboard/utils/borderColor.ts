export const borderColor = (
  e: Awaited<
    ReturnType<typeof import("../services/getUsersEvents").getUsersEvents>
  >[number],
): string => {
  const month = e.date.getMonth();

  if (e.deletedAt) {
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
