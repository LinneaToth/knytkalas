export const findContrMatch = (
  contribution: { name?: string | null },
  contributions: { name?: string | null }[],
) => {
  const contributionName = contribution?.name?.toLowerCase().trim();
  const match = contributions.find(
    (contr) => contr.name?.toLowerCase() === contributionName,
  );
  return match;
};
