import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Expense } from '@/hooks/use-expense';
import type { TFunction } from 'i18next';
import { ca } from 'date-fns/locale';

export const createColumns = (
  onEdit: (expense: Expense) => void,
  onDelete: (expense: Expense) => void,
  t: TFunction,
  locale: string = 'fr-FR',
  formatAmount: (amount: number) => string
): ColumnDef<Expense>[] => [
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {
      const category: { title: string; color: string } = row.getValue('category');
      const rowIndex = row.index + 1;

      return (
        <div
          className="font-bold text-sm w-full h-full min-w-[80px] lg:min-w-auto flex items-center justify-center -m-4 p-4 dark:text-white"
          style={{
            background: `linear-gradient(90deg, ${category.color}, transparent 80%)`,
          }}
        >
          {rowIndex}
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: () => (
      <div className="text-left text-sm lg:text-base tracking-wider">
        {t('expenses.table.columns.title')}
      </div>
    ),
    cell: ({ row }) => {
      const title: string = row.getValue('title');
      return (
        <div className="font-medium text-xs lg:text-sm -m-4 p-4 h-full w-full flex items-center">
          {title}
        </div>
      );
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: 'category',
    header: () => (
      <div className="text-center text-sm lg:text-base tracking-wider">
        {t('expenses.table.columns.category')}
      </div>
    ),
    cell: ({ row }) => {
      const category: { title: string; color: string } = row.getValue('category');
      return (
        <div className="flex justify-center">
          <Badge
            className={'!border align-center items-center capitalize min-w-26'}
            style={{
              background: category.color,
            }}
          >
            <span className="font-bold text-xs text-white">
              {t(category.title) || t('expenses.uncategorized')}
            </span>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: () => (
      <div className="text-center text-sm lg:text-base tracking-wider">
        {t('expenses.table.columns.date')}
      </div>
    ),
    cell: ({ row }) => {
      const date: string = row.getValue('date');
      const formated = new Date(Date.parse(date));
      return (
        <div className="flex justify-center">
          <span className="font-bold text-xs lg:text-sm">
            {formated.toLocaleDateString(locale)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => (
      <div className="text-right text-sm lg:text-base tracking-wider">
        {t('expenses.table.columns.amount')}
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-right font-medium">{formatAmount(row.getValue('amount'))}</div>;
    },
  },
  {
    accessorKey: 'edit',
    header: '',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="bg-transparent cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color border-none  focus:outline-none focus:ring-0 focus:ring-transparent
             focus-visible:outline-none focus-visible:ring-0
             data-[highlighted]:bg-transparent data-[state=open]:bg-transparent
             shadow-none focus:shadow-none focus-visible:shadow-none"
            >
              <Button variant="outline" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="outline  rounded-md shadow-lg" align="start">
              <DropdownMenuItem
                className="p-2 dark:bg-primary cursor-pointer hover:!bg-secondary-color transition-all duration-150 ease-in-out"
                onSelect={() => onEdit(row.original)}
              >
                <Pencil className="dark:text-white text-dark" />
                {t('expenses.table.actions.edit')}
              </DropdownMenuItem>

              <DropdownMenuItem
                className="p-2 dark:bg-primary cursor-pointer hover:!bg-red-500 dark:hover:bg-red-700/20 transition-all duration-150 ease-in-out"
                onSelect={() => onDelete(row.original)}
              >
                <Trash2 className="dark:text-white text-dark" />
                {t('expenses.table.actions.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
