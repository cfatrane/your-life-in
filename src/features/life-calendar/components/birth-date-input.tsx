"use client";

import { useMemo, useState } from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type BirthDateInputProps = {
  onChange: (value: string) => void;
};

export function BirthDateInput({ onChange }: BirthDateInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const minMonth = useMemo(() => new Date(1900, 0), []);
  const maxMonth = useMemo(() => new Date(), []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "h-12 w-[280px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
          )}
          variant="outline"
        >
          <CalendarIcon className="mr-2 size-4" />

          {selectedDate
            ? format(selectedDate, "PPP")
            : "Sélectionne ta date de naissance"}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="center" className="w-auto p-0">
        <Calendar
          captionLayout="dropdown"
          endMonth={maxMonth}
          mode="single"
          onSelect={(date) => {
            setSelectedDate(date);
            onChange(date ? format(date, "yyyy-MM-dd") : "");
          }}
          selected={selectedDate}
          startMonth={minMonth}
        />
      </PopoverContent>
    </Popover>
  );
}
