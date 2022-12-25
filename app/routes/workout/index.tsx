import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useState } from "react";
import { requireUserId } from "~/utils/auth.server";
import { createExercise, getExercisesById } from "~/utils/training.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const exercise = await getExercisesById(userId);
  return json({ exercise, userId });
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const message = form.get("message");

  if (typeof message !== "string") {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  if (!message.length) {
    return json({ error: `Please provide a message.` }, { status: 400 });
  }

  await createExercise({ name: "push ups", userId, value: message });

  return redirect("/workout");
};

export default function Training() {
  const actionData = useActionData();
  const { exercise, userId } = useLoaderData();
  const [formError] = useState(actionData?.error || "");
  const [formData, setFormData] = useState({
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData((data) => ({ ...data, [field]: e.target.value }));
  };

  console.log("user", exercise, userId, actionData);
  return (
    <div className="Training">
      <h1>Training</h1>

      <Form method="post">
        <textarea
          name="message"
          className="w-full rounded-xl h-40 p-4"
          value={formData.message}
          onChange={(e) => handleChange(e, "message")}
          placeholder={`Set value`}
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
