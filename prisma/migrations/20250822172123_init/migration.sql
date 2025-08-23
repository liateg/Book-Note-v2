/*
  Warnings:

  - A unique constraint covering the columns `[edition_key]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cover_edition_key]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cover_id]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Book" ADD COLUMN     "cover_edition_key" TEXT,
ADD COLUMN     "cover_id" TEXT,
ADD COLUMN     "edition_key" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Book_edition_key_key" ON "public"."Book"("edition_key");

-- CreateIndex
CREATE UNIQUE INDEX "Book_cover_edition_key_key" ON "public"."Book"("cover_edition_key");

-- CreateIndex
CREATE UNIQUE INDEX "Book_cover_id_key" ON "public"."Book"("cover_id");
