import axios from "@/api/axios";
import { useAppDispatch } from "@/feature/hooks";
import { clearAuth } from "@/feature/auth/auth-slice";
import { clearUser } from "@/feature/user/user-slice";

export default function useLogout() {
  const dispatch = useAppDispatch();

  const logout = async () => {
    //clear the redux slice
    dispatch(clearAuth())
    dispatch(clearUser())

    try {
      await axios.get("/v1/logout", {withCredentials: true})
    } catch (error) {
      console.error(error)
    }
  }


  return logout;
}
