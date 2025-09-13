import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorPage from "./components/common/error-page"
import Register from "./pages/auth/register"
import Login from "./pages/auth/login"
import Home from "./pages/home/home"

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage/>,
    element: <App/>,
    children: [
      // Public routes
      { path: "register", element: <Register/> },
      { path: "login", element: <Login/>},
      { path: "home", element: <Home/>}
    ]
  }
])

