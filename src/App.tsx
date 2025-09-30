import { Outlet } from "react-router-dom"
import { useAppSelector } from "./feature/hooks"
import { userState } from "./feature/user/user-slice"
import Navbar from "./components/common/navbar"
import Footer from "./components/common/footer"
import AutoLogout from "./components/common/auto-logout"

function App() {
  const user = useAppSelector(userState)

  return (
    <div className="h-screen flex flex-col font-inter text-gray-800">
      <AutoLogout/>

      {user?.role !== "ADMIN"
        && <Navbar />}

      <div className="bg-base-200 flex-grow">
          <Outlet />
      </div>

      {user?.role !== "ADMIN"
        && <Footer />}

    </div>
  )
}

export default App
