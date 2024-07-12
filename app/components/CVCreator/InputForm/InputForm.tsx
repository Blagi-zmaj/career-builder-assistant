import React, { forwardRef } from "react";

interface InputFormProps {
  name: string;
  value: string;
  placeholder?: string;
  isTextArea?: boolean;
  handleKeyEnterAndShift: (event: React.KeyboardEvent) => void;
  [x: string]: any;
}

const InputForm = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFormProps
>(
  (
    { name, value, placeholder, isTextArea, handleKeyEnterAndShift, ...props },
    ref
  ) => {
    return (
      <>
        {isTextArea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={3}
            name={name}
            value={value}
            placeholder={placeholder}
            onKeyDown={handleKeyEnterAndShift}
            {...props}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
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
);

// Add displayName for debugging purposes
InputForm.displayName = "InputForm";

export default InputForm;
