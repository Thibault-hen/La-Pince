import { format } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
	name: string;
	required?: boolean;
	value: Date;
	onChange: (date: Date) => void;
}

export function DatePicker({
	name,
	required,
	value,
	onChange,
}: DatePickerProps) {
	const { i18n } = useTranslation();

	const dateLocale = i18n.language === 'en' ? enUS : fr;

	return (
		<div className="space-y-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						aria-label="Open calendar"
						type="button"
						variant="outline"
						className="w-full justify-start text-center font-normal dark:bg-primary"
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{format(value, 'PPP', { locale: dateLocale })}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={value}
						onSelect={(value) => {
							value && onChange(value);
						}}
						className="w-full rounded-lg border"
					/>
				</PopoverContent>
			</Popover>

			<input
				type="hidden"
				name={name}
				value={value.toISOString().split('T')[0]}
				required={required}
			/>
		</div>
	);
}
