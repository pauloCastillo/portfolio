import type { FieldProps } from "@/types";

export default function Field({
  labelText,
  labelField,
  type,
  placeholder,
  fieldValue,
  fieldControlMethod,
}: Readonly<FieldProps>) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={labelField}
        className="block text-gray-800 dark:text-gray-200 mt-2.5"
      >
        {labelText}
      </label>
      <input
        type={type}
        id={labelField}
        name={labelField}
        autoComplete="off"
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        onChange={fieldControlMethod}
        value={fieldValue}
        placeholder={placeholder}
      />
    </div>
  );
}
