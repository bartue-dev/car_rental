import { useContext } from "react";
import AuthContext from "../context/authProvider";

//useAuth custom hook
function useAuth() {
  return useContext(AuthContext)
}

export default useAuth;