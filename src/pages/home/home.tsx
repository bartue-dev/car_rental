import { useAppSelector } from "@/feature/hooks"
import { username as sliceUsername } from "@/feature/user/user-slice"

export default function Home() {
  const username = useAppSelector(sliceUsername)

  return (
    <div>
      <h1>{username}</h1>
    </div>
  )
}