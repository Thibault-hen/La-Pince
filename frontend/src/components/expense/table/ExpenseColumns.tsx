import type { ColumnDef } from '@tanstack/react-table';
import {
  format,
  formatDistanceToNow,
  isSameDay,
  isToday,
  isYesterday,
} from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import type { TFunction } from 'i18next';
import {
  Calendar,
  Captions,
  EllipsisVertical,
  HandCoins,
  Pencil,
  Tag,
  Tags,
  Trash2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Expense } from '@/types/expense';
import { getCategoryIcon } from '@/utils/categoryIcon';

export const createColumns = (
  onEdit: (expense: Expense) => void,
  onDelete: (expense: Expense) => void,
  t: TFunction,
  locale: string = 'fr-FR',
  formatAmount: (amount: number) => string,
): ColumnDef<Expense>[] => [
  {
    accessorKey: 'title',
    header: () => (
      <div className="ml-4 -m-1 p-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
            <Captions className="w-4 h-4 text-primary-color" />
          </div>

          <span className="font-semibold text-foreground text-xs uppercase tracking-widest">
            {t('expenses.table.columns.title')}
          </span>
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const title: string = row.getValue('title');
      const category = row.getValue('category') as {
        title: string;
        color: string;
      };

      return (
        <div className="font-medium text-xs lg:text-sm -m-4 p-4 h-full w-full flex items-center ml-4">
          <div
            className="w-1 h-5 rounded-full mr-2"
            style={{
              backgroundColor: category?.color || '#cbd5e1',
            }}
          />
          {title}
        </div>
      );
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: 'category',
    header: () => (
      <div className="ml-4 -m-1 p-4">
        <div className="flex justify-center items-center gap-3">
          <div className="p-1.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
            <Tags className="w-4 h-4 text-primary-color" />
          </div>

          <span className="font-semibold text-foreground text-xs uppercase tracking-widest">
            {t('expenses.table.columns.category')}
          </span>
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const category: { title: string; color: string } =
        row.getValue('category');
      const hasCategory = category?.title && category?.color;
      const IconComponent = getCategoryIcon(category?.title);

      if (!hasCategory) {
        return (
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="
                        border-dashed items-center capitalize min-w-26 gap-1.5 rounded-xl bg-secondary-color/20 text-secondary-color border-secondary-color
                    shadow-sm font-bold text-xs border
                    "
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-secondary-color">
                <Tag className="w-3.5 h-3.5 text-white" />
              </div>
              {t('expenses.uncategorized')}
            </Badge>
          </div>
        );
      }

      return (
        <div className="flex justify-center">
          <Badge
            className="
                    items-center capitalize min-w-26 gap-1.5 rounded-xl
                    shadow-sm font-bold text-[0.625rem] md:text-xs border
                "
            style={{
              backgroundColor: `${category.color}15`,
              color: category.color,
              borderColor: `${category.color}`,
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              <IconComponent className="w-3.5 h-3.5 text-white" />
            </div>
            <span>{t(category.title)}</span>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const category = row.getValue(id) as {
        id: string;
        title: string;
        color: string;
      };
      return category.id === value;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'date',
    header: () => (
      <div className="ml-4 -m-1 p-4">
        <div className="flex justify-center items-center gap-3">
          <div className="p-1.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
            <Calendar className="w-4 h-4 text-primary-color" />
          </div>

          <span className="font-semibold text-foreground text-xs uppercase tracking-widest">
            {t('expenses.table.columns.date')}
          </span>
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const date: string = row.getValue('date');
      const parsedDate = new Date(date);
      const dateLocale = locale === 'fr-FR' ? fr : enUS;

      const getRelativeDate = () => {
        if (isToday(parsedDate)) return t('date.today');
        if (isYesterday(parsedDate)) return t('date.yesterday');

        return formatDistanceToNow(parsedDate, {
          addSuffix: true,
          locale: dateLocale,
        });
      };

      return (
        <div className="flex flex-col items-center">
          <span className="font-bold text-xs lg:text-sm text-foreground">
            {getRelativeDate()}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(parsedDate, 'dd/MM/yyyy', { locale: dateLocale })}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (!value) return true;

      const cellDate = new Date(row.getValue(id));

      switch (value.type) {
        case 'today':
          return isSameDay(cellDate, new Date());

        case 'yesterday': {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          return isSameDay(cellDate, yesterday);
        }

        case 'week':
          return (
            cellDate >= new Date(value.start) && cellDate <= new Date(value.end)
          );

        case 'month':
          return (
            cellDate.getMonth() === value.month &&
            cellDate.getFullYear() === value.year
          );

        case 'year':
          return cellDate.getFullYear() === value.year;
        default:
          return true;
      }
    },
  },
  {
    accessorKey: 'amount',
    header: () => (
      <div className="ml-4 -m-1 p-4">
        <div className="flex justify-end items-center gap-3">
          <div className="p-1.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
            <HandCoins className="w-4 h-4 text-primary-color" />
          </div>

          <span className="font-semibold text-foreground text-xs uppercase tracking-widest">
            {t('expenses.table.columns.amount')}
          </span>
        </div>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {formatAmount(row.getValue('amount'))}
        </div>
      );
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
              className="!bg-transparent cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color border-none focus:outline-none focus:ring-0 focus:ring-transparent
             focus-visible:outline-none focus-visible:ring-0
             data-[highlighted]:bg-transparent data-[state=open]:bg-transparent
             shadow-none focus:shadow-none focus-visible:shadow-none"
            >
              <Button variant="outline" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="outline  rounded-md shadow-lg"
              align="start"
            >
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
