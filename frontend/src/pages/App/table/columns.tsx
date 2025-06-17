import { EllipsisVerticalIcon, Pencil, Trash2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Expense } from '@/hooks/expenses';
import type { TFunction } from 'i18next';

export const createColumns = (
  onEdit: (expense: Expense) => void,
  onDelete: (expense: Expense) => void,
  t: TFunction,
  locale: string = 'fr-FR'
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
            className={
              'border align-center items-center capitalize min-w-26 bg-white dark:bg-secondary'
            }
            style={{
              border: '1px solid ' + category.color,
            }}
          >
            <span className="text-black dark:text-white">{category.title}</span>
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
      const amount = Number.parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'edit',
    header: '',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="outline  rounded-md shadow-lg" align="start">
              <DropdownMenuItem onSelect={() => onEdit(row.original)}>
                <Pencil size={20} />
                {t('expenses.table.actions.edit')}
              </DropdownMenuItem>

              <DropdownMenuItem
                variant="destructive"
                className=""
                onSelect={() => onDelete(row.original)}
              >
                <Trash2 />
                {t('expenses.table.actions.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
