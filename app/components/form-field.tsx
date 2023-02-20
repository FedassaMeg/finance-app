type FormFieldProps = {
  htmlFor: string;
  label: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
};

export function FormField(props: FormFieldProps) {
  const { htmlFor, label, type = "text", value, onChange = () => {} } = props;
  
  return (
    <>
      <label htmlFor={htmlFor} className="font-semibold">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className="w-full p-2 rounded-xl my-2"
        value={value}
      />
    </>
  );
}
