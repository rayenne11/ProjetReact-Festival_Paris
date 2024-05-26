import { Outlet } from "react-router-dom";

function BookLayout() {
  return (
    <div className="pt-32">
      <Outlet />
    </div>
  );
}

export default BookLayout;
