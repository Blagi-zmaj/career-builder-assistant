import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";

export default function ControlledCheckbox({ handleDisableEndDate }) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      checked={checked}
      value="start"
      control={<Checkbox />}
      label="Currently work"
      labelPlacement="start"
      onClick={handleChange}
      onChange={handleDisableEndDate}
    />
  );
}
