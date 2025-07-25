import { Link, useLocation } from "react-router-dom";
import ProfileStatus from "../subComponents/profileStatus";


function Navbar() {
  const location = useLocation();
  const path = location?.pathname.split("/")[1];

  return (
    <div className="navbar bg-base-10 border-b-1 border-gray-300 px-10 font-poppins">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
            <Link
              className="px-4 hover:bg-primary hover:text-white text-sm"
              to="/home"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
             to="/vehicles"
             className="px-4 hover:bg-primary hover:text-white text-sm"
             >
              Vehicles
            </Link>
          </li>
          <li>
            <Link 
            to="/about"
            className="px-4 hover:bg-primary hover:text-white text-sm"
            >
              About
            </Link>
          </li>
          </ul>
        </div>
        <Link 
          to="/"
          className="text-2xl btn btn-ghost font-bold hover:bg-transparent outline-0 border-0 shadow-none italic flex justify-center items-center gap-2"
        >
          EzRent
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base  gap-4">
          <li>
            <Link
              className={`px-4 hover:bg-primary hover:text-white ${path === "home" && "font-semibold"}`}
              to="/home"
              >
                Home
            </Link>
          </li>
          <li>
            <Link
              to="/vehicles"
              className={`px-4 hover:bg-primary hover:text-white ${path === "vehicles" && "font-semibold"}`}
             >
              Vehicles
            </Link>
          </li>
          <li>
            <Link 
              to="/about"
              className={`px-4 hover:bg-primary hover:text-white ${path === "about" && "font-semibold"}`}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <div className="flex gap-2">
          <Link to="/admin">ADMIN</Link>
          <Link to="/user">USER</Link>
        </div> */}
        <ProfileStatus />
      </div>
    </div>
  )
}

export default Navbar;