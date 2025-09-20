import { useAppSelector } from "@/feature/hooks";
import { userState } from "@/feature/user/user-slice";
import { Navigate } from "react-router-dom";
import Home from "@/pages/home/home";

export default function IndexRoute() {
  const user = useAppSelector(userState);

  return (
    user.role !== "ADMIN"
      ? <Home />
      : <Navigate to="/dashboard" />
  )
}