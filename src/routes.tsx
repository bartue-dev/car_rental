import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorPage from "./components/common/error-page"
import Register from "./pages/auth/register"
import Login from "./pages/auth/login"
import Home from "./pages/home/home"
import PersistLogin from "./components/common/persist-login"
import RequiredAuth from "./components/common/required-auth"
import Unauthorized from "./components/common/unauthorized"

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage/>,
    element: <App/>,
    children: [
      // Public routes
      { path: "unauthorized", element: <Unauthorized/>},
      { path: "register", element: <Register/> },
      { path: "login", element: <Login/>},
      { path: "home", element: <Home/>},

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
  }
])

