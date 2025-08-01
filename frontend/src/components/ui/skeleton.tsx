import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'animate-pulse rounded-md border dark:bg-primary bg-primary2',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
