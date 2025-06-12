import AutoLogout from "./components/autoLogout"
import Navbar from "./components/navbar"
import { Outlet } from "react-router-dom"
import Footer from "./components/footer"

function App() {

  return (
    <div className="w-full h-screen flex flex-col font-poppins text-gray-800">
      <AutoLogout/>
      <Navbar />
      <div className="py-5 bg-base-200 flex-grow">
          <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
