import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken"; 
import useAuth from "./useAuth";
import { useEffect } from "react";

function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {

    //set up the authorization Bearer TOKEN with initial accessToken
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    /*if initial accessToken expires call the useRefresh hook the create new accessToken
      then set it up to the authorization header Bearer TOKEN
    */
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error)
      }
    );

    
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosPrivate;
}

export default useAxiosPrivate;