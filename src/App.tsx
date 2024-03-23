import { useEffect, useState } from "react";

import { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/fr";
import updateLocale from "dayjs/plugin/updateLocale";
import { v4 as uuidv4 } from "uuid";

import Day from "@/components/Day";
import Select from "@/components/Select";
import { LIFE_PERIOD, NUMBER_OF_CASE_FOR_WEEKS } from "@/constants";

import "./App.css";

dayjs.extend(updateLocale);

// Replace "en" with the name of the locale you want to update.
dayjs.updateLocale("fr", {
  // Sunday = 0, Monday = 1.
  weekStart: 1,
});

function App() {
  const [period, setPeriod] = useState<string>("weeks");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [columns, setColumns] = useState<number>(52);
  const [weeksAlive, setWeeksAlive] = useState<number>(0);
  const [daysAlive, setDaysAlive] = useState<number>(0);
  const [list, setList] = useState<{ date: any; id: string }[]>([]);

  useEffect(() => {
    const arrayOfObjects = Array.from(
      { length: NUMBER_OF_CASE_FOR_WEEKS },
      () => {
        return {
          date: null,
          id: uuidv4(),
        };
      }
    );

    setList(arrayOfObjects);
  }, []);

  useEffect(() => {
    if (date) {
      const daysDiff = dayjs().diff(dayjs(date), "day");
      const weeksDiff = dayjs().diff(dayjs(date), "week");

      setDaysAlive(daysDiff);
      setWeeksAlive(weeksDiff);
    }
  }, [date]);

  const handleChange = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as string);
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center">
        <h1 className="text-8xl font-semibold">Your Life In</h1>

        <div className="flex items-center">
          <Select
            label="Period"
            onChange={handleChange}
            options={[
              { value: "years", label: "Years" },
              { value: "months", label: "Months" },
              { value: "weeks", label: "Weeks" },
            ]}
            value={period}
          />

          <LocalizationProvider adapterLocale="fr" dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                onAccept={(newValue) => setDate(newValue)}
                value={date}
              />
            </DemoContainer>
          </LocalizationProvider>
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
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {list.map((item, index) => (
            <Day
              isActive={index < weeksAlive}
              key={item.id}
              weekNumber={index + 1}
            />
          ))}
        </div>

        <div className="size-60 h-full rounded-lg border-2 border-black p-4 text-left"></div>
      </div>

      <p>
        <span>Inspired by </span>

        <a href="https://waitbutwhy.com/2014/05/life-weeks.html">WaitButWhy</a>
      </p>
    </div>
  );
}

export default App;
