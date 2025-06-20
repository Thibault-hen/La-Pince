import { Skeleton } from '../ui/skeleton';

export const DasboardSkeleton = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
          <Skeleton className="h-[20px] w-[20px] rounded-full" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex xl:w-3/4">
          <div className="w-full space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <Skeleton className="flex-1 h-[250px] rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-[250px] rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Skeleton className="h-[100px] rounded-lg" />
              <Skeleton className="h-[100px] rounded-lg" />
              <Skeleton className="h-[100px] rounded-lg" />
              <Skeleton className="h-[100px] rounded-lg" />
            </div>
          </div>
        </div>
        <div className="flex xl:w-1/4">
          <div className="flex flex-col w-full xl:max-w-xl justify-between gap-4">
            <div className="relative group">
              <Skeleton className="h-[110px] rounded-lg" />
            </div>
            <div className="relative group">
              <Skeleton className="h-[110px] rounded-lg" />
            </div>
            <div className="relative group">
              <Skeleton className="h-[110px] rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Skeleton className="h-[600px] xl:w-2/5 w-full" />
      </div>
    </>
  );
};
