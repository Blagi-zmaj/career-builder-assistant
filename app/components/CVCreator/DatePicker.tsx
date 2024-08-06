import { useState, useRef } from "react";

export default function DatePicker({
  date,
  id,
  type,
  index,
  listName,
  updateDate,
}) {
  const [isEditingState, setIsEditingState] = useState(false);

  const datePickerRef = useRef();

  const handleDateClick = () => {
    setIsEditingState(true);
    setTimeout(() => {
      if (datePickerRef.current) {
        datePickerRef.current.focus();
        datePickerRef.current.showPicker();
      }
    }, 0);
  };

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
            return updateDate(event.target.value, type, index, listName);
          }}
          onBlur={() => setIsEditingState((prev) => !prev)}
        />
      ) : (
        <span
          onClick={() => {
            setIsEditingState(true);
            handleDateClick();
          }}
        >
          {date}
        </span>
      )}
    </div>
  );
}
