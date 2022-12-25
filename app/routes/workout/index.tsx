import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { InputField } from "~/components/forms/InputField/InputField";
import { SelectBox } from "~/components/select-box";
import { requireUserId } from "~/utils/auth.server";
import {
  createExercise,
  getExercisesByUserIdAdnDate,
} from "~/utils/training.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const exercises = await getExercisesByUserIdAdnDate(userId, "25");
  return json({ exercises, userId });
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const value = form.get("value");
  const name = form.get("exerciseName") as string;

  if (typeof value !== "string") {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  if (!value.length) {
    return json({ error: `Please provide a value.` }, { status: 400 });
  }

  await createExercise({ name, userId, value: value });

  return redirect("/workout");
};

const exerciseArr = [
  { name: "push ups", value: "push ups" },
  { name: "pull ups", value: "pull ups" },
  { name: "squats", value: "squats" },
];

export default function Training() {
  const actionData = useActionData();
  const { exercises, userId } = useLoaderData();
  const [formError] = useState(actionData?.error || "");
  const [formData, setFormData] = useState({
    value: "",
    exerciseName: "",
  });

  useEffect(() => {
    setFormData((prev) => {
      return {
        value: "",
        exerciseName: "",
      };
    });
  }, [exercises?.length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData((data) => ({ ...data, [field]: e.target.value }));
  };

  const handleStyleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((data) => ({
      ...data,
      exerciseName: e?.target?.value,
    }));
  };

  console.log("user", exercises, userId, actionData);
  return (
    <div className="Training">
      <h1>Training</h1>

      <ul className="flex gap-2">
        {exercises?.map((item: any) => {
          return <li key={item?.id}>{item?.value}</li>;
        })}
      </ul>

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
          onChange={(e) => handleStyleChange(e)}
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
    </div>
  );
}
