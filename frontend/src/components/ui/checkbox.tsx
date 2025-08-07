import type * as React from 'react';

import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={'checkbox'}
			data-slot="input"
			className={cn(
				'appearance-none cursor-pointer rounded border checked:bg-primary-color checked:dark:!bg-primary-color checked:!text-primary-foreground dark:bg-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...props}
		/>
	);
}

export { Checkbox };
