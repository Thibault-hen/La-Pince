import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				'relative overflow-hidden rounded-md bg-primary2 dark:bg-primary border',
				className,
			)}
			{...props}
		>
			<span className="absolute inset-0 block h-full w-full animate-skeleton-shimmer bg-gradient-to-r from-transparent dark:via-white/10 via-gray-300 to-transparent" />
		</div>
	);
}

export { Skeleton };
