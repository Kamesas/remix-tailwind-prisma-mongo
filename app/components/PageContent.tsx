import { Outlet } from "@remix-run/react";
import { useRef } from "react";
import { WorkoutHeader } from "./WorkoutHeader";

function PageContent() {
  const mainContentRef = useRef(null);
  // const { pageTitle } = useSelector((state) => state.header);

  // Scroll back to top on new page load
  // useEffect(() => {
  //   mainContentRef.current.scroll({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, [pageTitle]);

  return (
    <div className="drawer-content flex flex-col ">
      <WorkoutHeader />

      <main
        className="flex-1 overflow-y-auto pt-8 px-6  bg-base-200"
        ref={mainContentRef}
      >
        <h1>Page content</h1>

        <Outlet />
        <div className="h-16"></div>
      </main>
    </div>
  );
}

export default PageContent;
