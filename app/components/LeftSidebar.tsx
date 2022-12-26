import { Link, NavLink, useLocation } from "@remix-run/react";

export function LeftSidebar() {
  const location = useLocation();

  const links = [
    { title: "Training", url: "/workout" },
    { title: "Chart", url: "/workout/chart" },
  ];

  return (
    <div className="drawer-side">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>

      <ul className="menu  pt-2 w-80 bg-base-100 text-base-content">
        <li className="mb-2 font-semibold text-xl">
          <Link to={"/"}>WorkoutApp</Link>
        </li>

        {links?.map((item) => {
          const isActive = location.pathname === item?.url;
          return (
            <li key={item?.url}>
              <NavLink
                to={item?.url}
                className={() =>
                  `${isActive ? "font-semibold  bg-base-200 " : "font-normal"}`
                }
              >
                {item?.title}
                {isActive && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                    aria-hidden="true"
                  />
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
