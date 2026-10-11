"use client";

import { fr } from "react-day-picker/locale";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type BirthDateInputProps = {
  value: string | null;
  disabled: boolean;
  onChange: (value: string) => void;
};

export function BirthDateInput({
  value,
  disabled,
  onChange,
}: BirthDateInputProps) {
  const selectedDate = value ? parseISO(value) : undefined;
  const today = new Date();
  const label = selectedDate
    ? `Date de naissance : ${format(selectedDate, "d MMMM yyyy", { locale: fr })}`
    : "Sélectionne ta date de naissance";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label={label}
          className={cn(
            "h-12 w-[280px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
          )}
          disabled={disabled}
          variant="outline"
        >
          <CalendarIcon className="mr-2 size-4" />

          {selectedDate
            ? format(selectedDate, "d MMMM yyyy", { locale: fr })
            : "Sélectionne ta date de naissance"}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="center" className="w-auto p-0">
        <Calendar
          captionLayout="dropdown"
          defaultMonth={selectedDate ?? today}
          disabled={{ before: new Date(1900, 0, 1), after: today }}
          endMonth={today}
          formatters={{
            formatMonthDropdown: (date) => format(date, "MMM", { locale: fr }),
          }}
          locale={fr}
          mode="single"
          onSelect={(date) => {
            if (date) onChange(format(date, "yyyy-MM-dd"));
          }}
          required
          selected={selectedDate}
          startMonth={new Date(1900, 0, 1)}
        />
      </PopoverContent>
    </Popover>
  );
}
