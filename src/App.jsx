import AutoLogout from "./components/autoLogout"
import Navbar from "./components/navbar"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className="w-full h-screen">
      <AutoLogout/>
      <Navbar />
        <div className="px-14">
            <Outlet />
        </div>
    </div>
  )
}

export default App
