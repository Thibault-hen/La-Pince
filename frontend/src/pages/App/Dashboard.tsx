import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DasboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { LastExpenses } from '@/components/dashboard/LastExpenses';
import { EditIncomeModal } from '@/components/dashboard/modals/EditIncomeModal';
import { ExpensesOverallChart } from '@/components/dashboard/ExpensesOverallChart';
import { FinanceCard } from '@/components/dashboard/ExpensesOverallCard';
import { Progress } from '@/components/ui/progress';
import { useDashboard } from '@/hooks/use-dashboard';
import { useCurrency } from '@/hooks/use-currency';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';
import { getPercentage, getPercentageRaw } from '@/utils/percentage';
import {
  AlertCircle,
  BadgePercent,
  Calculator,
  CheckCircle,
  Euro,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorPercentage, getColorStatus } from '@/utils/colorStatus';

export const Dashboard = () => {
  const { data: dashboardData, isLoading } = useDashboard();
  const { formatAmount } = useCurrency();
  const { t } = useTranslation();
  const [openEditIncome, setOpenEditIncome] = useState(false);

  if (isLoading) {
    return (
      <DefaultWrapper>
        <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
          <DasboardSkeleton />
        </div>
      </DefaultWrapper>
    );
  }

  return (
    <DefaultWrapper key={String(isLoading)}>
      <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
        <EditIncomeModal
          open={openEditIncome}
          setOpen={setOpenEditIncome}
          income={dashboardData?.currentMonthRevenue}
        />
        <DashboardHeader onOpenEditModal={() => setOpenEditIncome(true)} />

        <div className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {/* Revenue Card */}
            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-primary dark:via-primary dark:to-blue-900/20 p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
                  <Euro className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.cards.income')}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {formatAmount(dashboardData?.currentMonthRevenue?.value ?? 0)}
                </div>
                <p className="text-sm text-muted-foreground">{t('dashboard.cards.totalIncome')}</p>
              </div>
            </div>

            {/* Budget Card */}
            <div className="bg-gradient-to-br from-white to-green-50 dark:from-primary dark:via-primary dark:to-green-900/20 p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <Calculator className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.cards.totalBudget')}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xl md:text-2xl font-bold">
                  {formatAmount(dashboardData?.currentMonthBudget ?? 0)}
                </div>
                <p className="text-sm text-muted-foreground">{t('dashboard.cards.totalBudgets')}</p>
              </div>
            </div>

            {/* Remaining Card */}
            <div className="bg-gradient-to-br from-white to-purple-50 dark:from-primary dark:via-primary dark:to-purple-900/20 p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                </div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.cards.remaining2')}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xl md:text-2xl font-bold">
                  <span>
                    {(dashboardData?.currentMonthRevenue?.value ?? 0) -
                      (dashboardData?.currentMonthExpenses ?? 0) <=
                    0
                      ? formatAmount(0)
                      : formatAmount(
                          (dashboardData?.currentMonthRevenue?.value ?? 0) -
                            (dashboardData?.currentMonthExpenses ?? 0)
                        )}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{t('dashboard.cards.remaining')}</p>
              </div>
            </div>

            {/* Current Month Expenses */}
            <div className="xl:col-span-3 2xl:col-span-1 bg-gradient-to-br from-white to-red-50 dark:from-primary dark:via-primary dark:to-red-900/20 rounded-xl border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t('dashboard.cards.expenses')}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                      {formatAmount(dashboardData?.currentMonthExpenses ?? 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t('dashboard.overallCard.totalSpent')}
                    </p>
                  </div>

                  {/* Progress section */}
                  {dashboardData?.currentMonthRevenue?.value &&
                  dashboardData?.currentMonthRevenue?.value > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        {getPercentageRaw(
                          dashboardData?.currentMonthExpenses,
                          dashboardData?.currentMonthRevenue?.value ?? 0
                        ) > ColorPercentage.warning ? (
                          <AlertCircle
                            className="h-4 w-4"
                            style={{
                              color: getColorStatus(
                                dashboardData?.currentMonthExpenses,
                                dashboardData?.currentMonthRevenue?.value ?? 0
                              ),
                            }}
                          />
                        ) : getPercentageRaw(
                            dashboardData?.currentMonthExpenses,
                            dashboardData?.currentMonthRevenue?.value ?? 0
                          ) > ColorPercentage.ok ? (
                          <AlertCircle
                            className="h-4 w-4"
                            style={{
                              color: getColorStatus(
                                dashboardData?.currentMonthExpenses,
                                dashboardData?.currentMonthRevenue?.value ?? 0
                              ),
                            }}
                          />
                        ) : (
                          <CheckCircle
                            className="h-4 w-4"
                            style={{
                              color: getColorStatus(
                                dashboardData?.currentMonthExpenses,
                                dashboardData?.currentMonthRevenue?.value ?? 0
                              ),
                            }}
                          />
                        )}
                        <span className="text-xs font-medium">
                          {getPercentage(
                            dashboardData?.currentMonthExpenses ?? 0,
                            dashboardData?.currentMonthRevenue?.value ?? 0
                          )}{' '}
                          {t('dashboard.overallCard.used')}
                        </span>
                      </div>

                      <Progress
                        value={Math.min(
                          dashboardData?.currentMonthExpenses ?? 0,
                          dashboardData?.currentMonthRevenue?.value ?? 0
                        )}
                        max={dashboardData?.currentMonthRevenue?.value ?? 1}
                        className="w-full h-2 border [&>*]:bg-[var(--bg-color)]"
                        style={
                          {
                            '--bg-color': getColorStatus(
                              dashboardData?.currentMonthExpenses,
                              dashboardData?.currentMonthRevenue?.value ?? 0
                            ),
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  ) : (
                    <div className="bg-secondary-color/10 border border-secondary-color p-3 rounded-md text-center">
                      <span className="text-secondary-color text-xs font-medium">
                        {t('dashboard.overallCard.updateYourIncome')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Second Row: Charts and detailed stats */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Monthly Chart */}
            <div className="lg:col-span-1">
              <ExpensesOverallChart
                last6MonthsExpensesByMonth={dashboardData?.last6MonthsExpensesByMonth ?? {}}
              />
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <FinanceCard
                title={t('dashboard.overallCards.spentToday')}
                amount={dashboardData?.todayExpenses ?? 0}
              />
              <FinanceCard
                title={t('dashboard.overallCards.spentLast7Days')}
                amount={dashboardData?.currentWeekExpenses ?? 0}
              />
              <FinanceCard
                title={t('dashboard.overallCards.spentLastMonth')}
                amount={dashboardData?.previousMonthExpenses ?? 0}
              />
              <FinanceCard
                title={t('dashboard.overallCards.averageSpent')}
                amount={dashboardData?.averageMonthlyExpenses ?? 0}
                icon={<BadgePercent className="w-4 h-4 text-primary-color" />}
              />
            </div>
          </div>
        </div>

        <LastExpenses lastExpensesData={dashboardData?.last10Expenses || []} />
      </div>
    </DefaultWrapper>
  );
};
