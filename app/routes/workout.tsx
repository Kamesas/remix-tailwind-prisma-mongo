import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { createExerciseAction } from "~/actions/workout";
import { requireUserId } from "~/utils/auth.server";
import {
  createTraining,
  createTrainingRep,
  deleteExercise,
  getTrainingByUserIdAndDate,
} from "~/utils/training.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const training = await getTrainingByUserIdAndDate(userId, "25");
  return json({ training, userId });
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const { id } = Object.fromEntries(form);
  const actionsName = form.get("_action");

  switch (actionsName) {
    case "create":
      return await createExerciseAction({ form, userId });
    case "createTraining":
      return await createTraining({ userId });
    case "createTrainingRep":
      return await createTrainingRep({trainingId: id as string, name: "push ups", value: "60"}); // prettier-ignore
    case "delete":
      return await deleteExercise({ exerciseId: id as string });

    default:
      return null;
  }
};

const Workout = () => {
  const { training } = useLoaderData();

  console.log("training", training);

  return (
    <div className="h-screen grid grid-cols-12">
      <div className="flex gap-4">
        <Form method="post">
          <button
            type="submit"
            aria-label="create training exercise"
            name="_action"
            value={"createTraining"}
            className="rounded-xl bg-yellow-300 font-semibold text-blue-600 w-80 h-12 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
          >
            Create training
          </button>
        </Form>

        <Form method="post">
          <button
            type="submit"
            aria-label="create training rep"
            name="_action"
            value={"createTrainingRep"}
            className="rounded-xl bg-yellow-300 font-semibold text-blue-600 w-80 h-12 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
          >
            <input type={"hidden"} value={training[0]?.id} name="id" />
            Create training rep
          </button>
        </Form>
      </div>

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
