/*
  Warnings:

  - Changed the type of `amount` on the `budget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `month` on the `budget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "budget_category_id_fkey";

-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "budget_user_id_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_color_id_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_user_id_fkey";

-- DropForeignKey
ALTER TABLE "expense" DROP CONSTRAINT "expense_budget_id_fkey";

-- DropForeignKey
ALTER TABLE "expense" DROP CONSTRAINT "expense_user_id_fkey";

-- DropForeignKey
ALTER TABLE "income" DROP CONSTRAINT "income_user_id_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_user_id_fkey";

-- AlterTable
ALTER TABLE "budget" DROP COLUMN "amount",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
DROP COLUMN "month",
ADD COLUMN     "month" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "budget_month_year_user_id_key" ON "budget"("month", "year", "user_id");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
