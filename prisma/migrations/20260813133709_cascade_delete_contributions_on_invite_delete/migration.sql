-- DropForeignKey
ALTER TABLE "Contribution" DROP CONSTRAINT "Contribution_inviteId_fkey";

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "Invite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
