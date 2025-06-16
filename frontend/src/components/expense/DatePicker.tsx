import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { fr } from 'date-fns/locale';

interface DatePickerProps {
  name: string;
  required?: boolean;
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ name, required, value, onChange }: DatePickerProps) {

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="  w-full justify-start text-center font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(value, 'PPP', { locale: fr })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(value) => { value && onChange(value) }}
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
