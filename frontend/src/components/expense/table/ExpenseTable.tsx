/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { BanknoteArrowDown, Search } from 'lucide-react';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { CategoryWithBudget } from '@/types/category';
import { CategoryFilter } from './ExpenseCategoryFilter';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  categories: CategoryWithBudget[];
  children?: React.ReactNode;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  categories,
  children,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { t } = useTranslation();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  const filteredItems = table.getFilteredRowModel().rows.length;

  const skeletonId = useId();

  const handleCategoryFilter = (categoryId: string) => {
    if (categoryId === 'all') {
      table.getColumn('category')?.setFilterValue(undefined);
    } else {
      table.getColumn('category')?.setFilterValue(categoryId);
    }
  };
  return (
    <>
      <div>
        {data && data.length > 0 && (
          <CategoryFilter
            categories={categories}
            onFilter={handleCategoryFilter}
          />
        )}
      </div>
      <div className="relative flex flex-col py-4">
        <div className="flex justify-between items-center ">
          <Search className="absolute left-3 top-6.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('expenses.table.filterPlaceholder')}
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            className="w-full md:max-w-sm pl-10 mb-6 md:mb-0"
          />
          {children}
        </div>
      </div>
      <div className="rounded-md border dark:bg-primary">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className=" hover:bg-primary-color/20 transition-colors"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className=" font-bold text-lg" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              new Array(5).fill(0).map((_, idx) => {
                return (
                  <TableRow key={`${skeletonId}-${idx}`}>
                    <TableCell
                      colSpan={columns.length}
                      className=" text-center"
                    >
                      <Skeleton className="bg-primary-color/50 h-10 w-full" />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="hover:bg-primary-color/20 transition-colors"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t('expenses.table.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
              <BanknoteArrowDown className="w-4 h-4 text-primary-color" />
            </div>
            <span>{filteredItems}</span>
            <span className="text-muted-foreground font-bold">
              {filteredItems === 1
                ? t('expenses.table.singularCount')
                : t('expenses.table.pluralCount')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="blue"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t('expenses.table.previous')}
          </Button>
          <Button
            variant="blue"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t('expenses.table.next')}
          </Button>
        </div>
      </div>
    </>
  );
}
