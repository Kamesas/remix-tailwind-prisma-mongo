import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/utils/auth.server";
import { getExercisesById } from "~/utils/training.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const exercise = await getExercisesById(userId);
  return json({ exercise, userId });
};

export default function Training() {
  const { exercise, userId } = useLoaderData();
  console.log("user", exercise, userId);
  return <div className="Training">Training</div>;
}
