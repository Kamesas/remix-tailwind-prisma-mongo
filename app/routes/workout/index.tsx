import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ExerciseList } from "~/components/ExerciseList";
import { TrainingForm } from "~/components/forms/TrainingForm/TrainingForm";
import { requireUserId } from "~/utils/auth.server";
import { getExercisesByUserIdAndDate} from "~/utils/training.server"; // prettier-ignore

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const exercises = await getExercisesByUserIdAndDate(userId, "25");
  return json({ exercises, userId });
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
