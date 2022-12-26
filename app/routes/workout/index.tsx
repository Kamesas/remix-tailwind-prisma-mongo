import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ExerciseList } from "~/components/ExerciseList";
import { CreateTraining } from "~/components/forms/CreateTraining/CreateTraining";
import { TrainingForm } from "~/components/forms/TrainingForm/TrainingForm";
import { requireUserId } from "~/utils/auth.server";
import { getTrainingByUserIdAndDate } from "~/utils/training.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const training = await getTrainingByUserIdAndDate(userId, "25");
  return json({ training, userId });
};

export default function Training() {
  const { training } = useLoaderData();

  return (
    <>
      <h1 className="uppercase text-xl text-emerald-800">Training</h1>

      <ExerciseList />
      {!training?.id && <CreateTraining />}
      {training?.id && <TrainingForm />}
    </>
  );
}
