import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";

export default function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    // <Checkbox
    //   checked={checked}
    //   onChange={handleChange}
    //   inputProps={{ "aria-label": "controlled" }}
    // />
    <FormControlLabel
      value="start"
      control={<Checkbox />}
      label="Currently work"
      labelPlacement="start"
    />
  );
}
