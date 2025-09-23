import axios from "@/api/axios";
import { useAppDispatch } from "@/feature/hooks";
import { setAuth } from "@/feature/auth/auth-slice";

export default function useRefreshToken() {
  const dispatch = useAppDispatch();
  

  const refresh = async () => {
    try {
      const response = await axios.get("/v1/refreshToken", {withCredentials: true});

      //save overwrite the existing accessToken with the new accessToken from refreshToken api
      //as well as the role for persistent login component
      dispatch(setAuth({
        accessToken: response?.data?.accessToken,
        role: response?.data?.role
      }));
      
       //return the new accessToken from refreshToken api
      return response.data.accessToken
    } catch (error) {
      console.error("useRefreshToken err:", error)
    }
  }

  return refresh;
}