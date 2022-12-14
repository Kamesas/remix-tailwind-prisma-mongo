// app/components/form-field.tsx

import { useEffect, useState } from "react";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
  error?: string;
}

export function InputField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
  error = "",
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    // setErrorText(error);
  }, [error]);

  return (
    <>
      <label htmlFor={htmlFor} className="text-blue-600 font-semibold">
        {label}
      </label>
      <input
        onChange={(e) => {
          onChange(e);
          setErrorText("");
        }}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className="w-full p-2 rounded-xl my-2"
        value={value}
      />
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errorText || ""}
      </div>
    </>
  );
}

// import type { FC } from "react";

// type tInputFieldProps = {
//   inputsProps: React.DetailedHTMLProps<
//     React.InputHTMLAttributes<HTMLInputElement>,
//     HTMLInputElement
//   > &
//     React.DetailedHTMLProps<
//       React.TextareaHTMLAttributes<HTMLTextAreaElement>,
//       HTMLTextAreaElement
//     > & { id: string };
//   label: string;
//   fieldType?: "input" | "textarea";
// };

// export const InputField: FC<tInputFieldProps> = ({
//   inputsProps,
//   label,
//   fieldType = "input",
// }) => {
//   const Component = fieldType;
//   return (
//     <div className="InputField">
//       <label htmlFor={inputsProps?.id} className="font-serif">
//         {label}
//       </label>
//       <Component
//         {...inputsProps}
//         className={`w-full p-2 rounded-xl my-2 border-black border ${inputsProps?.className}`}
//       />
//     </div>
//   );
// };
