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
    cell: () => {
      return '';
    },
  },
  {
    accessorKey: 'title',
    header: t('expenses.table.columns.title'),
    cell: ({ row }) => {
      const title: string = row.getValue('title');
      return <div className="font-medium">{title}</div>;
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: 'category',
    header: () => <div className="text-center">{t('expenses.table.columns.category')}</div>,
    cell: ({ row }) => {
      const category: { title: string; color: string } = row.getValue('category');
      return (
        <div className="flex justify-center">
          <Badge
            className={'border align-center items-center capitalize min-w-26'}
            style={{ backgroundColor: category.color, color: '#fff' } as React.CSSProperties}
          >
            <span className="font-bold">{t(category.title)}</span>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: t('expenses.table.columns.date'),
    cell: ({ row }) => {
      const date: string = row.getValue('date');
      const formated = new Date(Date.parse(date));
      return <span>{formated.toLocaleDateString(locale)}</span>;
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className=" text-right">{t('expenses.table.columns.amount')}</div>,
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
