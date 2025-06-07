import useAuth from "../hooks/useAuth";
import { Outlet, useLocation, Navigate } from "react-router-dom";

//RequiredAuth component wrap all the route base on roles in routes
function RequiredAuth({allowedRole}) {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.role === allowedRole
      ? <Outlet />
      : auth?.username
        ? <Navigate to="/unauthorized" state={{from: location}} replace />
        : <Navigate to="/login" state={{from: location}} replace />
  )
}

export default RequiredAuth;