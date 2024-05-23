import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Stack } from "@mui/material";
import Checkbox from "./Checkbox";

export default function DatePickerValue() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(new Date().toJSON().slice(0, 10))
  );
  // console.log(new Date().toJSON().slice(0, 10).replace(/-/g, "/"));
  console.log(new Date().toJSON().slice(0, 10));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          margin: 3,
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "start",
          justifyItems: "start",
        }}
        margin={4}
      >
        <DatePicker
          label="Start"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
        <Stack
          sx={{
            margin: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "start",
            // justifyItems: "start",
          }}
          margin={4}
        >
          <DatePicker
            label="End"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            disabled
          />
          <Checkbox />
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
