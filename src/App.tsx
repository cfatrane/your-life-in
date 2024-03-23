import { useEffect, useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";

import DatePicker from "@/components/DatePicker";
import Day from "@/components/Day";

import {
  LIFE_PERIOD,
  NUMBER_OF_WEEKS_BY_YEAR,
  NUMBER_OF_CASE_FOR_WEEKS,
} from "@/constants/layout";

import "./App.css";

function App() {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [weeksAlive, setWeeksAlive] = useState<number>(0);
  // const [daysAlive, setDaysAlive] = useState<number>(0);
  const weekList = Array.from({ length: NUMBER_OF_CASE_FOR_WEEKS }, () => {
    return {
      id: uuidv4(),
    };
  });

  useEffect(() => {
    if (date) {
      // const daysDiff = dayjs().diff(dayjs(date), "day");
      const weeksDiff = dayjs().diff(dayjs(date), "week");

      // setDaysAlive(daysDiff);
      setWeeksAlive(weeksDiff);
    }
  }, [date]);

  return (
    <div className="container">
      <div className="flex flex-col items-center">
        <h1 className="text-8xl font-semibold">Your Life In Weeks</h1>

        <div className="flex items-center">
          <DatePicker onAccept={(newValue) => setDate(newValue)} value={date} />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="size-60 h-full rounded-lg border-2 border-black p-4 text-left">
          <h5 className="mb-4 text-xl">Période</h5>

          {LIFE_PERIOD.map((item) => (
            <div className="mb-1 flex items-center" key={item.label}>
              <p className="mr-2">
                <span className="font-semibold">{item.label}: </span>

                <span>
                  {item.min} - {item.max}
                </span>
              </p>

              <div className={`size-3 rounded-sm ${item.color}`} />
            </div>
          ))}
        </div>

        <div
          className={`grid place-items-center gap-1`}
          style={{
            gridTemplateColumns: `repeat(${NUMBER_OF_WEEKS_BY_YEAR}, minmax(0, 1fr))`,
          }}
        >
          {weekList.map((item, index) => (
            <Day
              isActive={index < weeksAlive}
              key={item.id}
              weekNumber={index + 1}
            />
          ))}
        </div>

        <div className="size-60 h-full rounded-lg border-2 border-black p-4 text-left">
          COMING SOON
        </div>
      </div>

      <p>
        <span>Inspired by </span>

        <a href="https://waitbutwhy.com/2014/05/life-weeks.html">WaitButWhy</a>
      </p>
    </div>
  );
}

export default App;
