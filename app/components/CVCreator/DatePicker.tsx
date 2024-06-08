import { useState, useRef } from "react";

export default function DatePicker({
  date,
  id,
  type,
  index,
  // isEditing,
  updateDate,
}) {
  // console.log(date);

  //   const [startDate, setStartDate] = useState(date);
  const [isEditingState, setIsEditingState] = useState(false);

  const datePickerRef = useRef();
  if (isEditingState) {
    setTimeout(() => {
      datePickerRef?.current.focus();
      datePickerRef?.current?.showPicker();
    }, 0);
  }

  return (
    <div>
      {isEditingState ? (
        <input
          ref={datePickerRef}
          type="date"
          name="datePicker"
          id={id}
          value={date}
          onChange={(event) => {
            setIsEditingState((prev) => !prev);
            return updateDate(event.target.value, type, index);
          }}
          onBlur={() => setIsEditingState((prev) => !prev)}
        />
      ) : (
        <span
          onClick={() => {
            setIsEditingState(true);
          }}
        >
          {date}
        </span>
      )}
    </div>
  );
}
