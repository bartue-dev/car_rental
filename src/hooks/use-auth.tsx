import { useContext } from "react";
import type { AuthContextType } from "@/lib/types";
import AuthContext from "@/context/auth-provider";


//useAuth custom hook / context hook
//a context that able to save the user globally
export default function useAuth() : AuthContextType {
  const context = useContext(AuthContext) 
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}