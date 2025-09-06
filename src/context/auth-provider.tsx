import { 
  createContext,
  useState,
  useEffect
} from "react"

import type { 
  AuthProviderProps,
  AuthType,
  UserType,
  AuthContextType
} from "@/lib/types";


const AuthContext = createContext<AuthContextType | undefined>(undefined)

//context that wrap the entire app
export  function AuthProvider({children} : AuthProviderProps) {
  const [auth, setAuth] = useState<AuthType>({})
  const [user, setUser] = useState<UserType | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Auth provider err:", error)
      localStorage.removeItem("user")
    } finally {
      setAuthLoading(false)
    }
  }, [])

  // useEffect(() => {
  //   console.log("AUTH", auth)
  //   console.log("USER", user)
  // }, [auth, user])
  
  return (
    <AuthContext.Provider value={{auth, setAuth, user, setUser, authLoading}}>
      {children}
    </AuthContext.Provider>
  ) 
}

export default AuthContext;