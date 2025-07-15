import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import AutoLogout from "../components/common/autoLogout";

//Persist login component that wrap all the protected route in routes
function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false
    }

  }, [setIsLoading, refresh, auth?.accessToken]);


  return (
      <div>
        {isLoading 
          ? <p className="text-center">Loading...</p>
          : <Outlet/>}
      </div>
  )
}

export default PersistLogin;