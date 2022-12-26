import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";
import { createRepAction } from "~/actions/workout";
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
    <div className="h-screen grid grid-cols-12">
      <div className="h-12 col-span-full pb-3 border-b-slate-500 border-b-2">
        <NavLink to={"/"}>To home</NavLink>
      </div>
      <div className="h-screen col-span-3 flex flex-col">
        <NavLink to={"/workout"} className="p-2">
          Training
        </NavLink>
        <NavLink to={"/workout/chart"} className="p-2">
          Chart
        </NavLink>
      </div>
      <div className="col-span-9">
        <Outlet />
      </div>
    </div>
  );
};

export default Workout;
