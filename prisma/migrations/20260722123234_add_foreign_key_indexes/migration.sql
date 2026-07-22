-- CreateIndex
CREATE INDEX "Contribution_inviteId_idx" ON "Contribution"("inviteId");

-- CreateIndex
CREATE INDEX "Event_hostId_idx" ON "Event"("hostId");

-- CreateIndex
CREATE INDEX "Invite_eventId_idx" ON "Invite"("eventId");

-- CreateIndex
CREATE INDEX "Invite_guestId_idx" ON "Invite"("guestId");

-- CreateIndex
CREATE INDEX "Invite_invById_idx" ON "Invite"("invById");
