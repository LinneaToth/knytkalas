export const borderColor = (date: Date): string => {
  const month = date.getMonth();

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
