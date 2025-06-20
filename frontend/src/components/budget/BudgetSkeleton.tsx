import { Skeleton } from '../ui/skeleton';

export const BudgetSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-[130px] sm:w-[200px]" />
            <Skeleton className="h-4 w-[100px] sm:w-[160px]" />
          </div>
        </div>
        <Skeleton className="h-8 w-[100px] rounded-md" />
      </div>
      <div className="flex flex-col gap-4 h-[50vh] sm:flex-row">
        <Skeleton className="w-3/5 rounded-md sm:w-full" />
        <div className="grid grid-cols-1 w-2/5 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-full w-full rounded-md" />
          ))}
        </div>
      </div>
      <Skeleton className="h-5 w-[130px]" />
      <div className="flex items-center gap-4 sm:flex-col">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-[100px] w-1/4 rounded-md sm:w-full" />
        ))}
      </div>
    </div>
  );
};
