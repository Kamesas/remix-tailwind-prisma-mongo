import { json } from "@remix-run/node";
import { createExercise } from "~/utils/training.server";

export const createExerciseAction = async ({
  userId,
  form,
}: {
  userId: string;
  form: FormData;
}) => {
  const value = form.get("value") as string;
  const name = form.get("exerciseName") as string;

  if (typeof value !== "string") {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  if (!value.length) {
    return json({ error: `Please provide a value.` }, { status: 400 });
  }

  return await createExercise({ name, userId, value: value });
};
