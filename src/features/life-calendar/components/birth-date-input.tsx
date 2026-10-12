"use client";

import { type Ref, useState } from "react";
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
  ref?: Ref<HTMLButtonElement>;
  value: string | null;
  disabled: boolean;
  onChange: (value: string) => void;
};

export function BirthDateInput({
  ref,
  value,
  disabled,
  onChange,
}: BirthDateInputProps) {
  const selectedDate = value ? parseISO(value) : undefined;
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState(() => new Date());
  const label = selectedDate
    ? `Date de naissance : ${format(selectedDate, "d MMMM yyyy", { locale: fr })}`
    : "Sélectionne ta date de naissance";

  return (
    <Popover
      onOpenChange={(open) => {
        setOpen(open);
        if (open) setToday(new Date());
      }}
      open={open}
    >
      <PopoverTrigger asChild>
        <Button
          aria-label={label}
          className={cn(
            "story-button w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
          )}
          disabled={disabled}
          ref={ref}
          variant="outline"
        >
          <CalendarIcon className="mr-2 size-4" />

          {selectedDate
            ? format(selectedDate, "d MMMM yyyy", { locale: fr })
            : "Sélectionne ta date de naissance"}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        className="w-auto max-w-[calc(100vw-8px)] overflow-x-auto p-0"
        collisionPadding={2}
      >
        <Calendar
          captionLayout="dropdown"
          className="p-1 [--cell-size:44px] [&_.rdp-dropdown_root]:min-h-11 [&_.rdp-dropdowns]:text-base"
          defaultMonth={selectedDate ?? today}
          disabled={{ before: new Date(1900, 0, 1), after: today }}
          endMonth={today}
          formatters={{
            formatMonthDropdown: (date) => format(date, "MMM", { locale: fr }),
          }}
          locale={fr}
          mode="single"
          onSelect={(date) => {
            if (date) {
              onChange(format(date, "yyyy-MM-dd"));
              setOpen(false);
            }
          }}
          required
          selected={selectedDate}
          startMonth={new Date(1900, 0, 1)}
        />
      </PopoverContent>
    </Popover>
  );
}
