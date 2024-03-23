import { useState, useEffect } from "react";

import { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { v4 as uuidv4 } from "uuid";
import "dayjs/locale/fr";

import Day from "@/components/Day";
import Select from "@/components/Select";

import "./App.css";

dayjs.extend(updateLocale);

// Replace "en" with the name of the locale you want to update.
dayjs.updateLocale("fr", {
  // Sunday = 0, Monday = 1.
  weekStart: 1,
});

const NUMBER_OF_CASE_FOR_WEEKS = 52 * 90;
const NUMBER_OF_CASE_FOR_YEARS = 9 * 10;

function App() {
  const [period, setPeriod] = useState<string>("weeks");
  const [abscissa, setAbscissa] = useState<number>(52);
  const [ordinate, setOrdinate] = useState<number>(90);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [daysAlive, setDaysAlive] = useState<number>(0);
  const [weeksAlive, setWeeksAlive] = useState<number>(0);
  const [caseNumber, setCaseNumber] = useState<number>(
    NUMBER_OF_CASE_FOR_WEEKS
  );
  const [list, setList] = useState<{ date: any; id: string }[]>([]);

  const options = [
    { value: "years", label: "Years" },
    { value: "months", label: "Months" },
    { value: "weeks", label: "Weeks" },
  ];

  useEffect(() => {
    setCaseNumber(NUMBER_OF_CASE_FOR_WEEKS);
    const arrayOfObjects = Array.from(
      { length: NUMBER_OF_CASE_FOR_WEEKS },
      () => {
        return {
          date: null,
          id: uuidv4(), // Or any other unique identifier
        };
      }
    );

    setList(arrayOfObjects);

    // Return () => {};
  }, []);

  useEffect(() => {
    if (period === "years") {
      setCaseNumber(NUMBER_OF_CASE_FOR_YEARS);
      setAbscissa(9);
    } else if (period === "months") {
      setAbscissa(90);
      setOrdinate(52);
    } else if (period === "weeks") {
      setCaseNumber(NUMBER_OF_CASE_FOR_WEEKS);
      setList(Array.from({ length: NUMBER_OF_CASE_FOR_WEEKS }));
      const arrayOfObjects = Array.from(
        { length: NUMBER_OF_CASE_FOR_WEEKS },
        () => {
          return {
            id: uuidv4(), // Or any other unique identifier
            // ... other properties
          };
        }
      );

      console.log("arrayOfObjects", arrayOfObjects);
      setAbscissa(52);
    }
    // Return () => {};
  }, [period]);

  useEffect(() => {
    if (date) {
      // Const daysDiff = dayjs().diff(dayjs(date), "day");
      const weeksDiff = dayjs().diff(dayjs(date), "week");

      // SetDaysAlive(result);
      setWeeksAlive(weeksDiff);
    }

    // Return () => {};
  }, [date]);

  const handleChange = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as string);
  };

  if (list.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <div className="mb-6 flex flex-col items-center">
        <div className="flex">
          <h1 className="mr-6 text-xl">Your Life In</h1>
        </div>

        <div className="flex items-center">
          <Select
            label="Period"
            onChange={handleChange}
            options={options}
            value={period}
          />

          <LocalizationProvider adapterLocale="fr" dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                format="DD/MM/YYYY"
                onAccept={(newValue) => setDate(newValue)}
                // OnChange={(newValue) => setDate(newValue)}
                value={date}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>

      <div
        className={`grid place-items-center gap-1`}
        style={{
          gridTemplateColumns: `repeat(${abscissa + 1}, minmax(0, 1fr))`,
        }}
      >
        {list.map((item, index) => (
          <Day isActive={index < weeksAlive} key={item.id} weekNumber={index} />
        ))}

        {/* {list.map((item, index) => (
          <>
            {index % 52 === 0 ? (
              <>
                <div key={index}>{index / 52}</div>

                <Day
                  isActive={index < weeksAlive}
                  key={item.id}
                  weekNumber={index}
                />
              </>
            ) : (
              <Day
                isActive={index < weeksAlive}
                key={item.id}
                weekNumber={index}
              />
            )}
          </>
        ))} */}
      </div>

      <p>
        <span>Inspired by </span>

        <a href="https://waitbutwhy.com/2014/05/life-weeks.html">WaitButWhy</a>
      </p>
    </div>
  );
}

export default App;
