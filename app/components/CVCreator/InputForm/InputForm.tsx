export default function InputForm({
  name,
  value,
  placeholder,
  isTextArea,
  handleKeyEnterAndShift,
  ...props
}) {
  const handleKeyDown = function (event) {
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
          // onKeyDown={handleKeyDown}
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
