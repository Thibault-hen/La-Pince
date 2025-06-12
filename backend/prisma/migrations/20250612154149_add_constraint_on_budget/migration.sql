/*
  Warnings:

  - A unique constraint covering the columns `[month,year,category_id,user_id]` on the table `budget` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "budget_month_year_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "budget_month_year_category_id_user_id_key" ON "budget"("month", "year", "category_id", "user_id");
