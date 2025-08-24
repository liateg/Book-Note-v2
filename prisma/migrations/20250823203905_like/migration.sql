/*
  Warnings:

  - Added the required column `likes` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Like" ADD COLUMN     "likes" INTEGER NOT NULL;
