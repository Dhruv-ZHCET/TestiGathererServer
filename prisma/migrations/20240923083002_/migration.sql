/*
  Warnings:

  - You are about to drop the column `name` on the `Space` table. All the data in the column will be lost.
  - Added the required column `space_name` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Made the column `header` on table `Space` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "name",
ADD COLUMN     "space_name" TEXT NOT NULL,
ALTER COLUMN "header" SET NOT NULL;
