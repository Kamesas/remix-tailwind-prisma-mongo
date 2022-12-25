import type { ActionFunction } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";
import { createExerciseAction } from "~/actions/workout";
import { requireUserId } from "~/utils/auth.server";
import { deleteExercise } from "~/utils/training.server";

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
  return null;
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
