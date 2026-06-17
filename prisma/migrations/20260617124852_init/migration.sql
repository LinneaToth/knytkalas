-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('MEAT', 'DAIRY', 'LACTOSE', 'NUTS', 'GLUTEN', 'EGG', 'SHELLFISH', 'FISH', 'ANIMALBASED');

-- CreateEnum
CREATE TYPE "RsvpStatus" AS ENUM ('PENDING', 'GOING', 'DECLINED');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('STARTER', 'MAIN', 'SALAD', 'SIDE', 'BREAD', 'DESSERT', 'SNACK', 'DRINK', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avoids" "IssueType"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" SERIAL NOT NULL,
    "inviteId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "servings" INTEGER,
    "category" "CategoryType" NOT NULL,
    "contains" "IssueType"[],

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invite" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "invById" TEXT NOT NULL,
    "guestId" TEXT,
    "status" "RsvpStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "occasion" TEXT NOT NULL,
    "description" TEXT,
    "activeCategories" "CategoryType"[],
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "responseDeadline" TIMESTAMP(3),
    "hostId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_token_key" ON "Invite"("token");

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "Invite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_invById_fkey" FOREIGN KEY ("invById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
