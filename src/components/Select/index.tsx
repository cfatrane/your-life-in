import { useId } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SelectMUI, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  label: string;
  onChange: (event: SelectChangeEvent) => void;
  options: { value: string; label: string }[];
  value: any;
};

function Select({ label, onChange, options, value }: Props) {
  const selectId = useId();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${selectId}-label`}>{label}</InputLabel>

        <SelectMUI
          id={selectId}
          label={label}
          labelId={`${selectId}-label`}
          onChange={onChange}
          value={value}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectMUI>
      </FormControl>
    </Box>
  );
}

export default Select;
