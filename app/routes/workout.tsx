import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { createRepAction } from "~/actions/workout";
import { WorkoutLayout } from "~/components/layouts/WorkoutLayout";
import { requireUserId } from "~/utils/auth.server";
import { createTraining, deleteRep, getTrainingByUserIdAndDate} from "~/utils/training.server"; // prettier-ignore

export type actionsName = "createRep" | "deleteRep" | "createTraining";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const training = await getTrainingByUserIdAndDate(userId, "25");
  return json({ training, userId });
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const { id } = Object.fromEntries(form);
  const actionsName = form.get("_action") as actionsName;

  switch (actionsName) {
    case "createRep":
      return await createRepAction({ form, trainingId: id as string });
    case "createTraining":
      return await createTraining({ userId });
    case "deleteRep":
      return await deleteRep({ repId: id as string });

    default:
      return null;
  }
};

const Workout = () => {
  return (
    <div className="work">
      <h1>work test</h1>

      <Outlet />
    </div>
  );
  // return <WorkoutLayout />;
};

export default Workout;
