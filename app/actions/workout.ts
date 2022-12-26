import { json } from "@remix-run/node";
import { createTrainingRep } from "~/utils/training.server";

export const createRepAction = async ({
  trainingId,
  form,
}: {
  trainingId: string;
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

  return await createTrainingRep({ name, trainingId, value: value });
};
