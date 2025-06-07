import axios from "../api/axios";
import useAuth from "./useAuth";

function useLogout() {
  const {setAuth, setUser} = useAuth();

  const handleLogout = async () => {
    //clear the auth global state
    setAuth({})
    setUser()
    try {

      //call the logout endpoint from backend api 
      await axios.get("/v1/logout", {withCredentials: true});
      
      //remove the user from localStorage
      localStorage.removeItem("user")
    } catch (error) {
      console.error(error)
    }
  }

  return handleLogout;
}

export default useLogout;