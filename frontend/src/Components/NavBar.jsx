
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="h-screen w-60 bg-gray-800 ">
      <div>
        <img className="ml-10 h-30 w-30" src="../public/logo.jpg" alt="Logo" />
      </div>

      <ul className=" mt-10 ">
        <li className="m-5 text-white font-medium">
          <Link to="/deshboard">Deshboard</Link>
        </li>
        <li className="m-5 text-white font-medium">
          <Link to="/projectDetails">Project Page</Link>
        </li>
        <li className="m-5 text-white font-medium">
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
