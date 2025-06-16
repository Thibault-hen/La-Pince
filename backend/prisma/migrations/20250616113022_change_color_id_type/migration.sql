/*
  Warnings:

  - The primary key for the `color` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_color_id_fkey";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "color_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "color" DROP CONSTRAINT "color_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "color_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "color_id_seq";

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE CASCADE ON UPDATE CASCADE;
