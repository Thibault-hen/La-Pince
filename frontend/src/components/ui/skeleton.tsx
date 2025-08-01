import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'animate-pulse rounded-md border bg-primary dark:bg-background',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
