import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import ErrorPage from "../src/Pages/errorPage";
import Home from "../src/Pages/publicRoute/home";
import Login from "../src/Pages/publicRoute/login";
import Register from "../src/Pages/publicRoute/register";
import Unauthorized from "../src/Pages/unauthorized";
import RequiredAuth from "../src/Pages/requiredAuth";
import Admin from "../src/Pages/protectedRoute/admin/admin";
import User from "../src/Pages/protectedRoute/user/user";
import PersistLogin from "../src/Pages/persistLogin";
import Vehicles from "@/components/vehicles";
import VehicleDetails from "@/Pages/publicRoute/vehicleDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // Public routes
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "vehicles", element: <Vehicles />},
      { path: "/vehicle-details/:vehicleId", element: <VehicleDetails />},

      // Private routes can be added here
      { element: <PersistLogin />,
        children: [
        { element: <RequiredAuth allowedRole="ADMIN"/>,
          children: [
            { path: "/admin", element: <Admin />}
          ]},
        { element: <RequiredAuth allowedRole="USER"/>,
          children: [
            { path: "/user", element: <User />},
          ]}
        ]},
    ]
  }, 
  { path: "unauthorized", element: <Unauthorized />},
  { path: "register", element: <Register />},
  { path: "login", element: <Login />},
])

export default router;