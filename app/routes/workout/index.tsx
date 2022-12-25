import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { ExerciseList } from "~/components/ExerciseList";
import { TrainingForm } from "~/components/forms/TrainingForm/TrainingForm";
import { requireUserId } from "~/utils/auth.server";
import { createExercise, getExercisesByUserIdAndDate} from "~/utils/training.server"; // prettier-ignore

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const exercises = await getExercisesByUserIdAndDate(userId, "25");
  return json({ exercises, userId });
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const value = form.get("value") as string;
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

export default function Training() {
  const actionData = useActionData();
  const { exercises, userId } = useLoaderData();

  console.log("user", exercises, userId, actionData);
  return (
    <div className="Training">
      <h1 className="uppercase text-xl text-emerald-800">Training</h1>

      <ExerciseList />
      <TrainingForm />
    </div>
  );
}
