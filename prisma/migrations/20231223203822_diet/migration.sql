-- AlterTable
ALTER TABLE "User" ADD COLUMN     "diet_profile" TEXT;

-- CreateTable
CREATE TABLE "diet_profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "hasAllergies" BOOLEAN NOT NULL,
    "allergies" TEXT[],
    "existingDiet" TEXT NOT NULL,
    "religiousDiet" TEXT NOT NULL,
    "hasDisease" BOOLEAN NOT NULL,
    "diseases" TEXT[],

    CONSTRAINT "diet_profile_pkey" PRIMARY KEY ("id")
);
