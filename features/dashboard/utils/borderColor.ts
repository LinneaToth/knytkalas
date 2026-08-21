export const borderColor = (
  e: Awaited<
    ReturnType<typeof import("../services/getUsersEvents").getUsersEvents>
  >[number],
): string => {
  if (e.deletedAt) {
    return "border-l-inactive";
  }

  const borderClasses = {
    inactive: "border-l-inactive",
    success: "border-l-success",
    error: "border-l-error",
  };

  if (e.acceptedStatus === "PENDING") return borderClasses.inactive;
  if (e.acceptedStatus === "GOING") return borderClasses.success;
  if (e.acceptedStatus === "DECLINED") return borderClasses.error;
  return "border-l-primary";
};
