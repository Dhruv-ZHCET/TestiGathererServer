/*
  Warnings:

  - You are about to drop the column `textContent` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `videoContent` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `Content` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Rating` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserImageURL` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageURL` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTextContent` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "textContent",
DROP COLUMN "videoContent",
ADD COLUMN     "Content" TEXT NOT NULL,
ADD COLUMN     "Rating" INTEGER NOT NULL,
ADD COLUMN     "UserImageURL" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "imageURL" TEXT NOT NULL,
ADD COLUMN     "isTextContent" BOOLEAN NOT NULL;
