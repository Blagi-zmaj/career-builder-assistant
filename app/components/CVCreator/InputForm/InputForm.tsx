export default function InputForm({ name, value, placeholder, ...props }) {
  return (
    <>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
}
