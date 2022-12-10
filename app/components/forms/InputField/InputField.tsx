import type { FC } from "react";

type tInputFieldProps = {
  inputsProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    > & { id: string };
  label: string;
  fieldType?: "input" | "textarea";
};

export const InputField: FC<tInputFieldProps> = ({
  inputsProps,
  label,
  fieldType = "input",
}) => {
  const Component = fieldType;
  return (
    <div className="InputField">
      <label htmlFor={inputsProps?.id} className="font-serif">
        {label}
      </label>
      <Component
        {...inputsProps}
        className={`w-full p-2 rounded-xl my-2 border-black border ${inputsProps?.className}`}
      />
    </div>
  );
};
