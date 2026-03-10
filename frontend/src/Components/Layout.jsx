import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full ">
      <NavBar />
      <div className="ml-60 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
