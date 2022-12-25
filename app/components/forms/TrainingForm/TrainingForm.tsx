import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { SelectBox } from "~/components/select-box";
import { InputField } from "../InputField/InputField";
import { exerciseArr } from "~/CONSTANTS/workout";

export const TrainingForm = () => {
  const actionData = useActionData();
  const { exercises } = useLoaderData();
  const [formError] = useState(actionData?.error || "");
  const [formData, setFormData] = useState({
    value: "",
    exerciseName: "",
  });
  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        value: "",
      };
    });
  }, [exercises?.length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData((data) => ({ ...data, [field]: e.target.value }));
  };

  return (
    <Form method="post">
      <InputField
        htmlFor="value"
        label="Repetition"
        className="border-slate-700 border-2"
        value={formData.value}
        onChange={(e) => handleChange(e, "value")}
      />

      <SelectBox
        options={exerciseArr}
        name="exerciseName"
        value={formData.exerciseName}
        onChange={(e) => handleChange(e, "exerciseName")}
        label="Exercise name"
        containerClassName="w-36"
        className="w-full rounded-xl px-3 py-2 text-gray-400 border-slate-700 border-2"
      />
      <button
        type="submit"
        className="rounded-xl bg-yellow-300 font-semibold text-blue-600 w-80 h-12 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
      >
        Send
      </button>
    </Form>
  );
};
