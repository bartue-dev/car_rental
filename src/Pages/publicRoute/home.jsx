import Hero from "@/components/hero";
import Vehicles from "@/components/vehicles";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const {user} = useAuth();
  const navigate = useNavigate();

  /* if user role is admin redirect to the dashboard */
  useEffect(() => {
    if (user?.role === "ADMIN") {
      navigate("/dashboard")
    }
  },[navigate, user?.role])

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-10">
        <Hero />
      </div>
      <div>
        <Vehicles />
      </div>
    </div>
  )
}

export default Home;