-- DropForeignKey
ALTER TABLE "expense" DROP CONSTRAINT "expense_budget_id_fkey";

-- AlterTable
ALTER TABLE "expense" ALTER COLUMN "budget_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budget"("id") ON DELETE SET NULL ON UPDATE CASCADE;
