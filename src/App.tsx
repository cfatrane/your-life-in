import { useEffect, useMemo, useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";

import DatePicker from "@/components/DatePicker";
import DayList from "@/components/DayList";

import { LIFE_PERIOD, NUMBER_OF_CASE_FOR_WEEKS } from "@/constants/layout";

import "./App.css";

function App() {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [weeksAlive, setWeeksAlive] = useState<number>(0);
  const weekList = useMemo(
    () =>
      Array.from({ length: NUMBER_OF_CASE_FOR_WEEKS }, () => ({
        id: uuidv4(),
      })),
    [NUMBER_OF_CASE_FOR_WEEKS]
  );

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
      <div className="mb-12 flex flex-col items-center">
        <h1 className="text-8xl font-semibold">Your Life In Weeks</h1>

        <div className="flex items-center">
          <DatePicker
            label="Date de Naissance"
            onChange={(newValue) => setDate(newValue)}
            value={date}
          />
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

        <DayList weekList={weekList} weeksAlive={weeksAlive} />

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
