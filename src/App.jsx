import AutoLogout from "./components/autoLogout"
import Navbar from "./components/navbar"
import { Outlet } from "react-router-dom"
import Footer from "./components/footer"
import useAuth from "./hooks/useAuth"

function App() {
  const { user } = useAuth();

  return (
    <div className="w-full h-screen flex flex-col font-poppins text-gray-800">
      <AutoLogout/>

      {user?.role !== "ADMIN" 
       && <Navbar />}
      {/* <Navbar /> */}
      <div className="py-5 bg-base-200 flex-grow">
          <Outlet />
      </div>

      {user?.role !== "ADMIN" 
       && <Footer />}
      
    </div>
  )
}

export default App
