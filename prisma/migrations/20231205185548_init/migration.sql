-- CreateTable
CREATE TABLE "letter_reciver" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "letter_reciver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "letter_reciver_email_key" ON "letter_reciver"("email");
