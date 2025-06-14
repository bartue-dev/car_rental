import { createContext,  useState, useEffect } from "react"

const AuthContext = createContext({})

//context that wrap the entire app
export function AuthProvider({children}) {
  const [auth, setAuth] = useState({})
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    console.log("USER", user)
  }, [user])
  
  return (
    <AuthContext.Provider value={{auth, setAuth, user, setUser}}>
      {children}
    </AuthContext.Provider>
  ) 
}

export default AuthContext;