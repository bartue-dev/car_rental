import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "@/hooks/use-refresh-token";
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
    <div>
      {isLoading
        ? <LoaderCircle className="animated-spin"/>
        : <Outlet/>}
    </div>
  )
}