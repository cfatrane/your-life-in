import { useState, useEffect } from "react";

import { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

import Day from "@/components/Day";
import Select from "@/components/Select";

import "./App.css";

const NUMBER_OF_CASE_FOR_WEEKS = 52 * 90;
const NUMBER_OF_CASE_FOR_YEARS = 9 * 10;

function App() {
  const [period, setPeriod] = useState<string>("weeks");
  const [abscissa, setAbscissa] = useState<number>(52);
  // const [ordinate, setOrdinate] = useState<number>(90);
  const [date, setDate] = useState<Dayjs | null>(null);
  // const [daysAlive, setDaysAlive] = useState<number>(0);
  const [weeksAlive, setWeeksAlive] = useState<number>(0);
  const [caseNumber, setCaseNumber] = useState<number>(
    NUMBER_OF_CASE_FOR_WEEKS
  );

  const options = [
    { value: "years", label: "Years" },
    { value: "months", label: "Months" },
    { value: "weeks", label: "Weeks" },
  ];

  useEffect(() => {
    if (period === "years") {
      setCaseNumber(NUMBER_OF_CASE_FOR_YEARS);
      setAbscissa(9);
    }
    // else if (period === 'months') {
    //   setAbscissa(90);
    //   setOrdinate(52);
    // }
    else if (period === "weeks") {
      setCaseNumber(NUMBER_OF_CASE_FOR_WEEKS);
      setAbscissa(52);
    }
    // return () => {};
  }, [period]);

  useEffect(() => {
    if (date) {
      // const daysDiff = dayjs().diff(dayjs(date), "day");
      const weeksDiff = dayjs().diff(dayjs(date), "week");
      // setDaysAlive(result);
      setWeeksAlive(weeksDiff);
    }

    // return () => {};
  }, [date]);

  const handleChange = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as string);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex">
          <h1>Your Life In</h1>

          <Select
            label="Period"
            onChange={handleChange}
            options={options}
            value={period}
          />
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              format="DD/MM/YYYY"
              onAccept={(newValue) => setDate(newValue)}
              // onChange={(newValue) => setDate(newValue)}
              value={date}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div
        className={`grid place-items-center gap-1`}
        style={{
          gridTemplateColumns: `repeat(${abscissa + 1}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: caseNumber }).map((_, index) => (
          <>
            {index % 52 === 0 ? (
              <>
                <div>{index / 52}</div>

                <Day
                  isActive={index < weeksAlive}
                  key={index}
                  weekNumber={index}
                />
              </>
            ) : (
              <Day
                isActive={index < weeksAlive}
                key={index}
                weekNumber={index}
              />
            )}
          </>
        ))}
      </div>

      <p>
        <span>Inspired by </span>

        <a href="https://waitbutwhy.com/2014/05/life-weeks.html">WaitButWhy</a>
      </p>
    </div>
  );
}

export default App;
