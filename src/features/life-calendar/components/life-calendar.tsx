"use client";

import { BirthDateInput } from "@/features/life-calendar/components/birth-date-input";
import { Calendar } from "@/features/life-calendar/components/calendar";
import { TimeSinceBirth } from "@/features/life-calendar/components/time-since-birth";
import { NUMBER_OF_CASE_FOR_WEEKS } from "@/features/life-calendar/constants";
import { useBirthDate } from "@/features/life-calendar/hooks/use-birth-date";
import { useWeeksAlive } from "@/features/life-calendar/hooks/use-weeks-alive";
import { buildWeekList } from "@/features/life-calendar/lib/build-week-list";

export function LifeCalendar() {
  const [birthDate, setBirthDate] = useBirthDate();
  const weeksAlive = useWeeksAlive(birthDate);
  const weekList = buildWeekList(weeksAlive, NUMBER_OF_CASE_FOR_WEEKS);

  return (
    <>
      <div className="mb-12 flex flex-col items-center gap-4">
        <BirthDateInput onChange={setBirthDate} />

        <TimeSinceBirth birthDate={birthDate} />
      </div>

      <div className="flex justify-around">
        <div className="mx-auto xl:mx-0">
          <Calendar weekList={weekList} />
        </div>
      </div>
    </>
  );
}
