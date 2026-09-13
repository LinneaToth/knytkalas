export const spineColor = (
  e: Awaited<
    ReturnType<typeof import("../services/getUsersEvents").getUsersEvents>
  >[number],
): string => {
  const spineClasses = {
    inactive: "bg-inactive",
    success: "bg-success",
    error: "bg-error",
  };

  if (e.deletedAt) {
    return spineClasses.inactive;
  }

  if (e.acceptedStatus === "PENDING") return spineClasses.inactive;
  if (e.acceptedStatus === "GOING") return spineClasses.success;
  if (e.acceptedStatus === "DECLINED") return spineClasses.error;
  return "bg-primary";
};
