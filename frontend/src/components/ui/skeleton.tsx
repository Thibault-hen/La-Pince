import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      style={{
        backgroundColor: '#111111',
      }}
      data-slot="skeleton"
      className={cn('animate-pulse rounded-md border', className)}
      {...props}
    />
  );
}

export { Skeleton };
