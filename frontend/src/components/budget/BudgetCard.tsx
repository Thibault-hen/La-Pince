import { EllipsisVertical, Pencil, Trash2, TriangleAlert } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BudgetProps {
  budget: {
    title: string;
    amount: number;
    value: string;
    totalExpense: number;
  };
  onOpenEditModal: () => void;
  onOpenDeleteModal: () => void;
}

const ColorStatus = {
  ok: '#34eb74',
  warning: '#eb8c34',
  alert: '#FF0000',
};

export const BudgetCard = (props: BudgetProps) => {
  const budgetStatusBarColor = (value: number, max: number): string => {
    const percentage = (value / max) * 100;

    if (percentage < 60) return ColorStatus.ok;
    if (percentage < 90) return ColorStatus.warning;
    return ColorStatus.alert;
  };

  const percentage = ((props.budget.totalExpense / props.budget.amount) * 100).toFixed(1);
  return (
    <Card className="flex justify-around p-4 dark:bg-primary hover:border-secondary-color transition-all duration-200 ease-in-out">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle
            className="border-l-4 px-2 flex gap-2 items-center"
            style={{ borderLeftColor: props.budget.value }}
          >
            {props.budget.title}
            {props.budget.totalExpense > props.budget.amount && (
              <TriangleAlert
                size={30}
                className="text-red-500 bg-red-500/20 p-1 rounded-xl border border-red-500"
              />
            )}
          </CardTitle>
          <CardDescription className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="dark:bg-primary cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color border-none  focus:outline-none focus:ring-0 focus:ring-transparent
             focus-visible:outline-none focus-visible:ring-0
             data-[highlighted]:bg-transparent data-[state=open]:bg-transparent
             shadow-none focus:shadow-none focus-visible:shadow-none"
              >
                <Button variant="outline" size="icon">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="p-2 dark:bg-primary cursor-pointer hover:!bg-secondary-color transition-all duration-150 ease-in-out"
                  onClick={props.onOpenEditModal}
                >
                  <Pencil className="dark:text-white text-dark" />
                  <span>Editer</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-2 dark:bg-primary cursor-pointer hover:!bg-red-500 dark:hover:bg-red-700/20 transition-all duration-150 ease-in-out"
                  onClick={props.onOpenDeleteModal}
                >
                  <Trash2 className="dark:text-white text-dark" />
                  <span>Supprimer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col">
        <CardDescription className="flex justify-between space-x-1 items-center">
          <div className="flex gap-1 items-center">
            <span className="text-xs text-muted-foreground">Dépenses totales</span>
            <span
              className="text-xs"
              style={
                {
                  color: budgetStatusBarColor(props.budget.totalExpense, props.budget.amount),
                } as React.CSSProperties
              }
            >
              ({percentage}%)
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={`${props.budget.totalExpense > props.budget.amount ? 'text-red-500' : ''}`}
            >
              {props.budget.totalExpense}
            </span>
            <span>/</span>
            <span className="font-bold">{props.budget.amount} €</span>
          </div>
        </CardDescription>
        <Progress
          value={
            props.budget.totalExpense > props.budget?.amount
              ? props.budget.amount
              : props.budget.totalExpense
          }
          max={props.budget.amount}
          className="w-full border [&>*]:bg-[var(--bg-color)] h-3 mt-2"
          style={
            {
              '--bg-color': budgetStatusBarColor(props.budget.totalExpense, props.budget.amount),
            } as React.CSSProperties
          }
        />
      </CardContent>
    </Card>
  );
};
