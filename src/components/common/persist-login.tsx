import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "@/hooks/common/use-refresh-token";
import { useAppSelector } from "@/feature/hooks";
import { authAccessToken } from "@/feature/auth/auth-slice";
import { LoaderCircle } from "lucide-react";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true)
  const accessToken = useAppSelector(authAccessToken)
  const refresh = useRefreshToken()


  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        // await new Promise(resolve => setTimeout(resolve, 3000));
        await refresh()
      } catch (error) {
        console.error(error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    if (!accessToken) {
      verifyRefreshToken()
    } else {
      setIsLoading(false)
    }

    return () => {
      isMounted = false
    }

  },[refresh, accessToken])


  return (
    <div className="flex items-center justify-center min-h-screen">
      {isLoading
        ? <LoaderCircle 
            size={50}
            className="animate-spin" 
          />
        : <Outlet/>}
    </div>
  )
}