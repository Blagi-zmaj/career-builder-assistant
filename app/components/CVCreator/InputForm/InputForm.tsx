export default function InputForm({ name, value, ...props }) {
  return (
    <>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={name}
        {...props}
      />
    </>
  );
}
