import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createExerciseAction } from "~/actions/workout";
import { ExerciseList } from "~/components/ExerciseList";
import { TrainingForm } from "~/components/forms/TrainingForm/TrainingForm";
import { requireUserId } from "~/utils/auth.server";
import { deleteExercise, getExercisesByUserIdAndDate} from "~/utils/training.server"; // prettier-ignore

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const exercises = await getExercisesByUserIdAndDate(userId, "25");
  return json({ exercises, userId });
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const id = form.get("id") as string;
  const actionsName = form.get("_action") as keyof typeof actions;

  const actions = {
    create: createExerciseAction({ form, userId }),
    delete: deleteExercise({ exerciseId: id }),
  };

  await actions[actionsName];
  // return null;
  return redirect("/workout");
};

export default function Training() {
  return (
    <div className="Training">
      <h1 className="uppercase text-xl text-emerald-800">Training</h1>

      <ExerciseList />
      <TrainingForm />
    </div>
  );
}
