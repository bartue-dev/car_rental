import useAuth from "../../hooks/useAuth";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

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
    {user
          ? 
          <div className="flex justify-center items-center gap-2">
           <div className="dropdown dropdown-end">
              <div className="tooltip tooltip-left tooltip-primary" data-tip={`Hi, ${user}`}>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <UserRound 
                    size={25}
                    className="cursor-pointer"
                    />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li><Link to="/testimonials" className="text-base hover:bg-primary hover:text-white">Create testimonials</Link></li>
                <li><a onClick={handleLogout} className="text-base hover:bg-primary hover:text-white">Logout</a></li>
              </ul>
            </div>
            <div className="text-base">
                {user.charAt(0).toUpperCase() + user.split("").splice(1).join("")}
              </div>
          </div>
          :  <Link to="/login" className="bg-base-100 text-base hover:font-semibold">Log in</Link>
        }
    </>
  )
}

export default ProfileStatus;