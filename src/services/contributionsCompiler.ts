import type { InviteType, ContributionType } from "../types/types.js";

type CompiledContribution = {
  responsible: { id: InviteType["invitee"]["id"]; name: string };
  contributions: ContributionType[];
};

//Compiles contributions from all invites for a particular event
export const contributionsCompiler = async (invites: InviteType[]) => {
  const compiledContributions = invites.reduce<CompiledContribution[]>(
    (contributions: CompiledContribution[], invite: InviteType) => {
      const userContributions = {
        responsible: { id: invite.invitee.id, name: invite.invitee.name },
        contributions: invite.contributions,
      };
      contributions.push(userContributions);
      return contributions;
    },
    [],
  );
  return compiledContributions;
};
