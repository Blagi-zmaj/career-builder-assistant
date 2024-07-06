import React from "react";

// interface InputFormProps {
//   name: string;
//   value: string;
//   placeholder?: string;
//   isTextArea?: boolean;
//   handleKeyEnterAndShift: (
//     event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
//   ) => void;
//   [key: string]: any; // For additional props
// }

interface InputFormProps {
  name: string;
  value: string;
  placeholder?: string;
  isTextArea?: boolean;
  handleKeyEnterAndShift?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: () => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  autoFocus?: boolean;
  className?: string;
  type?: string;
}

export default function InputForm({
  name,
  value,
  placeholder,
  isTextArea,
  handleKeyEnterAndShift,
  ...props
}: InputFormProps) {
  const handleKeyDown = function (event: React.KeyboardEvent) {
    if (event.shiftKey && event.key === "Enter") {
      console.log(`Shift & Enter`);
    } else if (event.key === "Enter") {
      console.log(`Enter`);
    }
  };

  return (
    <>
      {isTextArea ? (
        <textarea
          rows={3}
          name={name}
          value={value}
          placeholder={placeholder}
          onKeyDown={handleKeyEnterAndShift}
          {...props}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onKeyDown={handleKeyEnterAndShift}
          {...props}
        />
      )}
    </>
  );
}
