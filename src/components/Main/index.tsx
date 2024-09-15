"use client";

import { useMemo, useState } from "react";

import dayjs from "dayjs";

import Calendar from "@/components/Calendar";
import { Input } from "@/components/ui/input";

import { NUMBER_OF_CASE_FOR_WEEKS } from "@/constants/layout";

import { DayType } from "@/types/layout";

function Main() {
  const [birthDate, setBirthDate] = useState<string | null>(null);

  const calculateWeeksAlive = (birthDate: string | null) => {
    if (birthDate) {
      const weeksDiff = dayjs().diff(dayjs(birthDate), "week");

      return weeksDiff;
    }
  };

  const weeksAlive = useMemo(() => calculateWeeksAlive(birthDate), [birthDate]);
  const weekList: DayType[] = Array.from(
    { length: NUMBER_OF_CASE_FOR_WEEKS },
    (item, index) => ({
      id: index,
      isActive: index < (weeksAlive ?? 0),
    }),
  );

  return (
    <>
      <div className="mb-12 flex flex-col items-center gap-4">
        <Input
          className="h-12 w-fit"
          onChange={(event) => setBirthDate(event.target.value)}
          type="date"
        />
      </div>

      <div className="flex justify-around">
        <div className="mx-auto xl:mx-0">
          <Calendar weekList={weekList} />
        </div>
      </div>
    </>
  );
}
export default Main;
