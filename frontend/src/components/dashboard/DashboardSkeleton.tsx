import { Skeleton } from '../ui/skeleton';

export const DasboardSkeleton = () => {
	return (
		<>
			{/* Header Skeleton */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
						<Skeleton className="h-[20px] w-[20px] rounded-full" />
					</div>
					<div className="flex flex-col gap-1">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
				<Skeleton className="h-10 w-24 rounded-md" />
			</div>

			<div className="space-y-6">
				<div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					<Skeleton className="h-[150px] md:h-[250px] rounded-xl bg-gradient-to-br from-gray-100 to-primary/10 dark:from-primary dark:to-primary/20" />
					<Skeleton className="h-[150px] md:h-[250px] rounded-xl bg-gradient-to-br from-gray-100 to-green-50 dark:from-primary dark:to-green-900/20" />
					<Skeleton className="h-[150px] md:h-[250px] rounded-xl bg-gradient-to-br from-gray-100 to-purple-50 dark:from-primary dark:to-purple-800/20" />
					<div className="lg:col-span-3 xl:col-span-1">
						<Skeleton className="h-[150px] md:h-[250px] rounded-xl bg-gradient-to-br from-gray-100 to-red-50 dark:from-primary dark:to-red-800/20" />
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="lg:col-span-1">
						<Skeleton className="h-[280px] rounded-xl" />
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Skeleton className="h-[130px] rounded-lg" />
						<Skeleton className="h-[130px] rounded-lg" />
						<Skeleton className="h-[130px] rounded-lg" />
						<Skeleton className="h-[130px] rounded-lg" />
					</div>
				</div>
			</div>

			<div className="relative group">
				<Skeleton className="h-[500px] w-full rounded-xl" />
			</div>
		</>
	);
};
