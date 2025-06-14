import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { fr } from 'date-fns/locale';
import { useState } from 'react';

interface DatePickerProps {
  name: string;
  required?: boolean;
  defaultValue?: Date;
}

export function DatePicker({ name, required, defaultValue }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(defaultValue);

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            data-empty={!date}
            className="  w-full justify-start text-center font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP', { locale: fr }) : <span>Choisir une date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full rounded-lg border"
          />
        </PopoverContent>
      </Popover>

      <input
        type="hidden"
        name={name}
        value={date ? date.toISOString().split('T')[0] : ''}
        required={required}
      />
    </div>
  );
}
