import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorPage from "./components/common/error-page"
import Register from "./pages/auth/register"
import Login from "./pages/auth/login"
import Home from "./pages/home/home"
import PersistLogin from "./components/common/persist-login"
import RequiredAuth from "./components/common/required-auth"
import Unauthorized from "./components/common/unauthorized"
import Vehicles from "./components/home/vehicles"
import About from "./components/home/about"
import VehicleDetails from "./components/home/vehicle-details"

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage/>,
    element: <App/>,
    children: [
      // Public routes
      { path: "unauthorized", element: <Unauthorized/>},
      { path: "home", element: <Home/>},
      { path: "vehicles", element: <Vehicles/>},
      { path: "about", element: <About/>},
      { path: "vehicles/vehicle-details/:vehicleId", element: <VehicleDetails/>},

      { element: <PersistLogin/>,
        children: [
            /* ADMIN route */
          { element: <RequiredAuth allowedRole="ADMIN"/>,
            children: [
              // { path: "dashboard", element: <Dashboard/>}
            ]
          },
            /* USER route */
          { element: <RequiredAuth allowedRole="USER"/>,
            children: [
              // { path: "testimonials", element: <TestimonialForm/>}
            ]
          }
        ]
      }
    ]
  },
  { path: "register", element: <Register/> },
  { path: "login", element: <Login/>},
])

