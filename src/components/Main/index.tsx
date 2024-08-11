"use client";

import { useEffect, useMemo, useState } from "react";

import dayjs, { Dayjs } from "dayjs";

// import { v4 as uuidv4 } from "uuid";
// import DatePicker from "@/components/DatePicker";
import DayList from "@/components/DayList";
import { Input } from "@/components/ui/input";
import WeekList from "@/components/WeekList";

import { LIFE_PERIOD, NUMBER_OF_CASE_FOR_WEEKS } from "@/constants/layout";

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
    <div>
      <div className="mb-12 flex flex-col items-center gap-4">
        <h1 className="text-center text-8xl font-semibold">
          Your Life In Weeks
        </h1>

        {/* <div className="flex items-center">
          <DatePicker
            label="Date de Naissance"
            onChange={(newValue) => setDate(newValue)}
            value={date}
          />
        </div> */}
        <Input
          className="w-36"
          onChange={(event) => setBirthDate(event.target.value)}
          type="date"
        />
      </div>

      <div className="flex justify-between">
        <div className="hidden size-60 h-full shrink-0 rounded-lg border-2 border-black p-4 lg:block">
          <h5 className="mb-4 text-xl">Période</h5>

          {LIFE_PERIOD.map((item) => (
            <div className="mb-1 flex items-center" key={item.label}>
              <p className="mr-2">
                <span className="font-semibold">{item.label}: </span>

                <span>
                  {item.min} - {item.max}
                </span>
              </p>

              <div
                className={`size-3 rounded-sm border border-black ${item.color}`}
              />
            </div>
          ))}
        </div>

        <div className="mx-auto flex gap-2">
          <WeekList />

          <DayList weekList={weekList} />
        </div>

        <div className="hidden size-60 h-full shrink-0 rounded-lg border-2 border-black p-4 lg:block">
          COMING SOON
        </div>
      </div>

      <p className="mt-12 flex items-center justify-center">
        <span>Inspired by </span>

        <a href="https://waitbutwhy.com/2014/05/life-weeks.html">WaitButWhy</a>
      </p>
    </div>
  );
}
export default Main;
