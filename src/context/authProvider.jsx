import { createContext,  useState } from "react"

const AuthContext = createContext({})

//context that wrap the entire app
export function AuthProvider({children}) {
  const [auth, setAuth] = useState({})
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  //retrieve localstorage user if username state is still null and save it to username state
  //just a helper if ever the user state doesnt get the localStorage user
  // useEffect(() => {
  //   try {
  //     if (user === null || user === undefined) {
  //       const item = localStorage.getItem("user")
  //       if (item) {
  //         setUser(JSON.parse(item))
  //       } 
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [user])

  return (
    <AuthContext.Provider value={{auth, setAuth, user, setUser}}>
      {children}
    </AuthContext.Provider>
  ) 
}

export default AuthContext;