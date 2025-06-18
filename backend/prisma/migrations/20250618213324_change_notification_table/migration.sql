/*
  Warnings:

  - You are about to drop the column `content` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `is_seen` on the `notification` table. All the data in the column will be lost.
  - Added the required column `budget_id` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maximum_amount` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notification_type` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification" DROP COLUMN "content",
DROP COLUMN "is_seen",
ADD COLUMN     "budget_id" TEXT NOT NULL,
ADD COLUMN     "maximum_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "notification_type" TEXT NOT NULL,
ADD COLUMN     "total_amount" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;
