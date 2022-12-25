import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserId(request);
  return json({ user });
};

export default function Home() {
  const { user } = useLoaderData();
  // console.log("user", user);

  return (
    <div>
      <div>
        <NavLink to={"/kudos"}>Kudos</NavLink>
        <NavLink to={"/workout"}>Workout</NavLink>
      </div>
    </div>
  );
}
