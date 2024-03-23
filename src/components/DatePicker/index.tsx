import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField as DateFieldMUI } from "@mui/x-date-pickers/DateField";
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
type Props = { label: string; onChange: (value: any) => void; value: any };

function DatePicker({ label, onChange, value }: Props) {
  return (
    <LocalizationProvider adapterLocale="fr" dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DateFieldMUI label={label} onChange={onChange} value={value} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DatePicker;
