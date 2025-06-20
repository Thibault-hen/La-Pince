import { Skeleton } from '../ui/skeleton';

export const CategorySkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
            <Skeleton className="h-[20px] w-[20px] rounded-full" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-[130px] sm:w-[200px]" />
            <Skeleton className="h-4 w-[130px]" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-[100px] rounded-md" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[100px]" />
          ))}
        </div>
      </div>
    </div>
  );
};
