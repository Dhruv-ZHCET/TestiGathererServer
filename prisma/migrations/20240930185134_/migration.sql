/*
  Warnings:

  - A unique constraint covering the columns `[space_name]` on the table `Space` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Space_space_name_key" ON "Space"("space_name");
