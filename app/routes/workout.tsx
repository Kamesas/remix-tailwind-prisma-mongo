import { NavLink, Outlet } from "@remix-run/react";

const Workout = () => {
  return (
    <div className="Workout">
      <div className="sidebar">
        <NavLink to={"/workout"}>Training</NavLink>
        <NavLink to={"/workout/chart"}>Chart</NavLink>
      </div>
      <div className="pageWrap">
        <div className="pageTitle">Page tittle</div>

        <Outlet />
      </div>
    </div>
  );
};

export default Workout;
