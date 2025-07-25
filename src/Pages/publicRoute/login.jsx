import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { useNavigate, } from "react-router-dom";
import { LoginForm } from "@/components/auth/login-form";

function Login() {
  const [serverErrMsg, setServerErrMsg] = useState({});
  const [isGuest, setIsGuest] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const formRef = useRef(null)
  const { setAuth, setUser } = useAuth();

  const navigate = useNavigate();
 /*  const location = useLocation();
  get the history page and save it to the from variable or just save "/" path
  const from = location.state?.from?.pathname || "/"; */ 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //FormData api
      const formData = new FormData(e.target);

      if (isGuest) {
        formData.append("username", "Guest");
        formData.append("password", "Guest123!")
        setIsGuest(false);
      } else if (isAdmin) {
        formData.append("username", "Admin");
        formData.append("password", "Admin12345!")
        setIsAdmin(false);
      }

      //get the username and password form formData
      const credentials = Object.fromEntries(formData)
      const username = credentials.username

      //clear the previous serverErrMsg 
      setServerErrMsg({})

      //post credentials to log in endpoint
      const response = await axios.post(
        "/v1/login",
        credentials,
        {
          headers : {"Content-Type" : "application/json"},
          withCredentials: true //set to true as it is set to the backend
        }
      )

      const accessToken = response.data.accessToken;
      const role = response.data.account.role;
      const accountId = response.data.account.accountId;

      //save the username, accessToken, role and accountId to the global state
      setAuth({username, accessToken, role, accountId});

      //set the username and role in a object to the localstorage
      //use for persistent profile status 
      //if the page refresh the user state will get the object data from the localstorage
      const userObject = {
        username: username,
        role: role
      }
      localStorage.setItem("user", JSON.stringify(userObject));
      //initial set the object to user state
      setUser(userObject)
      
      if (role === "ADMIN") {
        navigate("/dashboard")
      } else if (role === "USER") {
        navigate("/home")
      }

      /* navigate to the previous page if it is redirected to the log in
      navigate(from, {replace: true}) */

      //reset the form after successfull log in
      e.target.reset();
    } catch (error) {
      console.error(error)
      //validation message obj variable
      let validationMsg = {}

      //if error.response doesnt exist save "no server response" to the validation message obj
      if (!error?.response) {
        validationMsg.failed = "No server response!"
        
      } 
      //else if error.response.status is equal to 400 save the response message to the validation message obj
      else if (error?.response?.status === 400) {
        validationMsg.failed = error?.response?.data?.message
      } 
      // otherwise save "Log in failed"
      else {
        validationMsg.failed = "Log in failed"
      }

      //if validation message is not empty then save obj to the serverErrMsg state
      if (Object.keys(validationMsg).length > 0) {
        setServerErrMsg(validationMsg);
        return;
      }
    }
  }

  //trigger the form to submit if isGuest or isAdmin is true along with the formRef
  useEffect(() => {
    if ((isGuest || isAdmin) && formRef.current) {
      formRef.current.requestSubmit();
    }
  }, [isGuest, isAdmin])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
      <LoginForm 
        onSubmit={handleSubmit}
        serverErrMsg={serverErrMsg}
        setIsGuest={setIsGuest}
        setIsAdmin={setIsAdmin}
        formRef={formRef}
      />
      </div>
    </div>
  ) 
}

export default Login;