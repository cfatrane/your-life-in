import React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as DatePickerMUI } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);

// Replace "en" with the name of the locale you want to update.
dayjs.updateLocale("fr", {
  // Sunday = 0, Monday = 1.
  weekStart: 1,
});
type Props = { onAccept: (value: any) => void; value: any };

function DatePicker({ onAccept, value }: Props) {
  return (
    <LocalizationProvider adapterLocale="fr" dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePickerMUI onAccept={onAccept} value={value} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DatePicker;
