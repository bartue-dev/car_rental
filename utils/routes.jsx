import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import ErrorPage from "../src/Pages/errorPage";
import Home from "../src/Pages/publicRoute/home";
import Login from "../src/Pages/publicRoute/login";
import Register from "../src/Pages/publicRoute/register";
import Unauthorized from "../src/Pages/unauthorized";
import RequiredAuth from "../src/Pages/requiredAuth";
import PersistLogin from "../src/Pages/persistLogin";
import Vehicles from "@/components/home/vehicles";
import VehicleDetails from "@/Pages/publicRoute/vehicleDetails";
import TestimonialForm from "@/Pages/protectedRoute/user/testimonialForm";
import Dashboard from "@/Pages/protectedRoute/admin/dashboard";
import Main from "@/Pages/protectedRoute/admin/main";
import Bookings from "@/Pages/protectedRoute/admin/bookings";
import AdminVehicles from "@/Pages/protectedRoute/admin/admin-vehicles";
import AdminTestimonials from "@/Pages/protectedRoute/admin/admin-testimonials";
import AddBooking from "@/components/dashboard/bookingComponents/addBooking";
import AddVehicle from "@/components/dashboard/vehiclesComponents/addVehicle";
import BookingsUser from "@/components/booking/bookingsUser";
import About from "@/Pages/publicRoute/about";

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
      { path: "about", element: <About />},
      { path: "vehicle-details/:vehicleId", element: <VehicleDetails />},

      // Private routes can be added here
      { element: <PersistLogin />,
        children: [
        { element: <RequiredAuth allowedRole="ADMIN"/>,
          children: [
            { path: "dashboard", element: <Dashboard/>,
              children: [
                { index: true, element: <Main />},
                { path: "main", element: <Main />},
                { path: "admin/bookings", element: <Bookings />,
                  children: [
                    { path: "add-booking", element: <AddBooking/>}
                  ]
                },
                { path: "admin/vehicles", element: <AdminVehicles />,
                  children: [
                    { path: "add-vehicle", element: <AddVehicle/>}
                  ]
                },
                { path: "admin/testimonials", element: <AdminTestimonials />},
              ]
            },
          ]},
        { element: <RequiredAuth allowedRole="USER"/>,
          children: [
            { path: "testimonials", element: <TestimonialForm />},
          ]},
        { element: <RequiredAuth allowedRole="USER"/>, 
          children: [
            { path: "bookings-user", element: <BookingsUser/>}
          ]
        }
        ]},
    ]
  }, 
  { path: "unauthorized", element: <Unauthorized />},
  { path: "register", element: <Register />},
  { path: "login", element: <Login />},
])

export default router;