import { useAppSelector } from "@/feature/hooks";
import { authRole, authUsername } from "@/feature/auth/auth-slice";
import { Outlet, useLocation, Navigate } from "react-router-dom";

export default function RequiredAuth({allowedRole} : {allowedRole: string}) {
  const role = useAppSelector(authRole)
  const username = useAppSelector(authUsername)
  const location = useLocation()

  return (
    role === allowedRole
      ? <Outlet/>
      : username
        ? <Navigate to="/unauthorized" state={{from: location}} replace />
        : <Navigate to="/login" state={{from: location}} replace/>
  )
}
