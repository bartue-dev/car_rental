import { useAppSelector } from "@/feature/hooks"
import { username as sliceUsername } from "@/feature/user/user-slice"
import useLogout from "@/hooks/use-logout"
import { useNavigate } from "react-router-dom";

export default function Home() {
  const username = useAppSelector(sliceUsername)
  const logout = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>{username}</h1>
      <button
        onClick={handleLogout}
        className="cursor-pointer"
      >
        logout
      </button>
    </div>
  )
}