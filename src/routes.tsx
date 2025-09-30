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
import TestimonialForm from "./components/home/testimonial-form"
import BookingsUser from "./components/home/booking-user"
import Dashboard from "./pages/dashboard/dashboard"
import Main from "./components/dashboard/main"
import IndexRoute from "./components/common/index-route"
import Bookings from "./components/dashboard/bookings"
import AddBookingAdmin from "./components/dashboard/add-booking-admin"
import AdminVehicles from "./components/dashboard/admin-vehicles"
import AddVehicle from "./components/dashboard/add-vehicle"
import AdminTestimonialsData from "./components/dashboard/admin-testimonials"

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage/>,
    element: <App/>,
    children: [
      // Public routes
      { index: true, element: <IndexRoute/>},
      { path: "home", element: <Home/>},
      { path: "vehicles", element: <Vehicles/>},
      { path: "about", element: <About/>},
      { path: "vehicles/vehicle-details/:vehicleId", element: <VehicleDetails/>},
      { path: "unauthorized", element: <Unauthorized/>},

      { element: <PersistLogin/>,
        children: [
            /* ADMIN route */
          { element: <RequiredAuth allowedRole="ADMIN"/>,
            children: [
              { path: "dashboard", element: <Dashboard/>,
                children: [
                  { index: true, element: <Main/>},
                  { path: "main", element: <Main/>},
                  { path: "admin/bookings", element: <Bookings/>,
                    children: [
                      { path: "add-booking", element: <AddBookingAdmin/>}
                    ]
                  },
                  { path: "admin/vehicles", element: <AdminVehicles/>,
                    children: [
                      { path: "add-vehicle", element: <AddVehicle/>}
                    ]
                  },
                  { path: "admin/testimonials", element: <AdminTestimonialsData/>}
                ]
              }
            ]
          },
            /* USER route */
          { element: <RequiredAuth allowedRole="USER"/>,
            children: [
              { path: "testimonials", element: <TestimonialForm/>},
              { path: "bookings-user", element: <BookingsUser/>}
            ]
          }
        ]
      }
    ]
  },
  { path: "register", element: <Register/> },
  { path: "login", element: <Login/>},
])

