import useAuth from "../../hooks/useAuth";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { ChevronDown } from 'lucide-react';

function ProfileStatus() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  //logout function
  const handleLogout = async () => {
    await logout(); 

    //redirect to the login page
    navigate("/")
  }

  return (
    <>
    {/* if user exist
        then display the profile icon
        if user doesnt exist
        then display the login button
    */}
    {user?.role === "USER"
          ? 
          /* user profile status container */
          <div className="flex justify-center items-center gap-3">
            <div className="tooltip tooltip-left tooltip-primary" data-tip={`Hi, ${user?.username}`}>
              <div className="avatar">
                <UserRound 
                  size={25}
                />
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div 
                tabIndex={0} 
                className="flex justify-center items-center gap-2 w-22 h-10 rounded-md cursor-pointer hover:border-2"
              >
                {user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}
                <ChevronDown size={14}/>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <Link to="/testimonials" className="text-sm hover:bg-primary hover:text-white">
                    Create testimonials
                  </Link>
                </li>
                <li>
                  <Link to="/bookings-user" className="text-sm hover:bg-primary hover:text-white">
                    My bookings
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout} className="text-sm hover:bg-primary hover:text-white">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          : <Link to="/login" className="bg-base-100 text-base hover:font-semibold">Log in</Link>
        }
    </>
  )
}

export default ProfileStatus;