import { LeftSidebar } from "../LeftSidebar";
import PageContent from "../PageContent";

export function WorkoutLayout() {
  return (
    <>
      {/* Left drawer - containing page content and side bar (always open) */}
      <div className="drawer drawer-mobile">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <PageContent />
        <LeftSidebar />
      </div>

      {/* <ModalLayout
        isOpen={modalIsOpen}
        closeModal={() => dispatch(closeModal())}
        modalBodyType={modalBodyType}
        size={modalSize}
        extraObject={modalExtraObj}
      /> */}
    </>
  );
}
