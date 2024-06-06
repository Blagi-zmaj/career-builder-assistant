import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Stack } from "@mui/material";
import Checkbox from "./Checkbox";

export default function DatePickerValue({ actualDates, handleUpdateDates }) {
  const [startDateValue, setStartDateValue] = React.useState<Dayjs | null>(
    // dayjs(new Date().toJSON().slice(0, 10))
    dayjs(actualDates[0])
  );

  const [endDateValue, setEndDateValue] = React.useState<Dayjs | null>(
    // dayjs(new Date().toJSON().slice(0, 10))
    dayjs(actualDates[1])
  );

  console.log(actualDates[0], actualDates[1]);

  const [isDisabled, setIsDisabled] = React.useState(false);
  const handleDisableEndDate = function () {
    setIsDisabled((prevState) => !prevState);
  };

  function convertToLocaleDateTime(dateString) {
    // Parse the date string to a Date object in UTC
    const date = new Date(dateString + "T00:00:00Z");

    // Convert the Date object to a local timezone string
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
    };

    // Convert the date to a local timezone string with options
    const localDateTimeString = date.toLocaleString("pl-pl", options);

    return localDateTimeString;
  }

  // Example usage
  const dateStr = "2025-05-30";
  const localDateTime = convertToLocaleDateTime(dateStr);
  console.log("Local Date-Time:", localDateTime);

  // function convertUTCDateToLocalDate(date) {
  //   const newDate = new Date(
  //     date.getTime() - date.getTimezoneOffset() * 60 * 1000
  //   );
  //   return newDate;
  // }

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
          value={startDateValue}
          onChange={(newValue) => {
            setStartDateValue(newValue),
              handleUpdateDates([
                newValue?.toJSON().slice(0, 10),
                actualDates[1],
              ]);
          }}
        />
        <Stack
          sx={{
            margin: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          margin={4}
        >
          <DatePicker
            label="End"
            value={endDateValue}
            onChange={(newValue) => {
              setEndDateValue(newValue),
                handleUpdateDates([
                  actualDates[0],
                  newValue?.toJSON().slice(0, 10),
                ]);
            }}
            disabled={isDisabled}
          />
          <Checkbox handleDisableEndDate={handleDisableEndDate} />
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
