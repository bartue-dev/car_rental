import AutoLogout from "./components/common/autoLogout"
import Navbar from "./components/common/navbar"
import { Outlet } from "react-router-dom"
import Footer from "./components/common/footer"
import useAuth from "./hooks/useAuth"

function App() {
  const { user } = useAuth();

  return (
    <div className="h-screen flex flex-col font-poppins text-gray-800">
      <AutoLogout/>

      {user?.role !== "ADMIN" 
       && <Navbar />}
       
      <div className="py-5 bg-base-200 flex-grow">
          <Outlet />
      </div>

      {user?.role !== "ADMIN" 
       && <Footer />}
      
    </div>
  )
}

export default App
