import { NavLink, Outlet } from "@remix-run/react";

const Workout = () => {
  return (
    <div className="h-screen grid grid-cols-12">
      <div className="col-span-full pb-3 border-b-slate-500 border-b-2">
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
