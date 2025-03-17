import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addMonths, format, subMonths } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateFilterProps {
  onDateChange: (range: { from: Date; to: Date }) => void;
}

export function DateFilter({ onDateChange }: DateFilterProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });

  // Preset options
  const presets = [
    { label: 'Last 30 Days', value: { from: subMonths(new Date(), 1), to: new Date() } },
    { label: 'Last 3 Months', value: { from: subMonths(new Date(), 3), to: new Date() } },
    { label: 'Last 6 Months', value: { from: subMonths(new Date(), 6), to: new Date() } },
    { label: 'Year to Date', value: { from: new Date(new Date().getFullYear(), 0, 1), to: new Date() } },
  ];

  const handleDateChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setDate(range);
      onDateChange({ from: range.from, to: range.to });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="p-3 space-y-3">
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  size="sm"
                  variant="outline"
                  onClick={() => handleDateChange(preset.value)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            <div className="border-t pt-3">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateChange}
                numberOfMonths={2}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
