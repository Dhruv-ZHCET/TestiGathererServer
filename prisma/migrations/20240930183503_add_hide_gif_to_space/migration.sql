/*
  Warnings:

  - Added the required column `redirectPageUrl` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thankyou_img_url` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thankyou_msg` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thankyou_title` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "hide_gif" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "redirectPageUrl" TEXT NOT NULL,
ADD COLUMN     "thankyou_img_url" TEXT NOT NULL,
ADD COLUMN     "thankyou_msg" TEXT NOT NULL,
ADD COLUMN     "thankyou_title" TEXT NOT NULL;
