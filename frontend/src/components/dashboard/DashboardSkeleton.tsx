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

			{/* Enhanced Inline Dashboard Skeleton */}
			<div className="space-y-6">
				{/* First Row: Main metrics inline */}
				<div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{/* Revenue Card */}
					<Skeleton className="h-[140px] rounded-xl bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-700 dark:to-blue-800" />
					{/* Budget Card */}
					<Skeleton className="h-[140px] rounded-xl bg-gradient-to-br from-gray-100 to-green-100 dark:from-gray-700 dark:to-green-800" />
					{/* Remaining Card */}
					<Skeleton className="h-[140px] rounded-xl bg-gradient-to-br from-gray-100 to-purple-100 dark:from-gray-700 dark:to-purple-800" />
					{/* Current Month Expenses - Compact Card */}
					<div className="lg:col-span-3 xl:col-span-1">
						<Skeleton className="h-[140px] rounded-xl bg-gradient-to-br from-gray-100 to-red-100 dark:from-gray-700 dark:to-red-800" />
					</div>
				</div>

				{/* Second Row: Charts and detailed stats */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Monthly Chart */}
					<div className="lg:col-span-1">
						<Skeleton className="h-[280px] rounded-xl" />
					</div>

					{/* Quick Stats Grid */}
					<div className="grid grid-cols-2 gap-4">
						<Skeleton className="h-[130px] rounded-lg" />
						<Skeleton className="h-[130px] rounded-lg" />
						<Skeleton className="h-[130px] rounded-lg" />
						<Skeleton className="h-[130px] rounded-lg" />
					</div>
				</div>
			</div>

			{/* Last Expenses Skeleton */}
			<div className="relative group">
				<Skeleton className="h-[500px] w-full rounded-xl" />
			</div>
		</>
	);
};
