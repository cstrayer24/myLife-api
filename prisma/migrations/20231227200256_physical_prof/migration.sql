-- AlterTable
ALTER TABLE "diet_profile" ADD COLUMN     "requiredCallories" BIGINT;

-- CreateTable
CREATE TABLE "physical_profile" (
    "id" UUID NOT NULL DEFAULT gen_ranom_uuid(),
    "useriD" UUID NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" TEXT NOT NULL,
    "hasDisabilities" BOOLEAN NOT NULL,
    "strength" INTEGER NOT NULL,
    "endurance" INTEGER NOT NULL,
    "bma" INTEGER NOT NULL,

    CONSTRAINT "physical_profile_pkey" PRIMARY KEY ("id")
);
