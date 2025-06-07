import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [serverErrMsg, setServerErrMsg] = useState({});
  const { setAuth, setUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  //get the history page and save it to the from variable or just save "/" path
  const from = location.state?.from?.pathname || "/"; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //FormData api
      const formData = new FormData(e.target);

      //get the username and password form formData
      const username = formData.get("username");
      const password = formData.get("password");

      //clear the previous serverErrMsg 
      setServerErrMsg({})

      //post credentials to log in endpoint
      const response = await axios.post(
        "/v1/login",
        JSON.stringify({username, password}),
        {
          headers : {"Content-Type" : "application/json"},
          withCredentials: true //set to true as it is set to the backend
        }
      )

      //set the username to the localstorage
      //use for persistent profile status 
      localStorage.setItem("user", JSON.stringify(username));
      setUser(username)

      const accessToken = response.data.accessToken;
      const role = response.data.account.role;
      const accountId = response.data.account.accountId;

      //save the username, accessToken, role and accountId to the global state
      setAuth({username, accessToken, role, accountId});
      
      //navigate to the previous page if it is redirected to the log in
      navigate(from, {replace: true})

      //reset the form after successfull log in
      e.target.reset();
    } catch (error) {
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

  return (
    <div>
      <form 
        className="flex flex-col border border-gray-400 rounded-md m-auto mt-10 gap-4 w-fit px-10 py-5"
        onSubmit={handleSubmit}
      >

        <h1 className="m-auto font-bold text-3xl">Log in</h1>
        
        {/* display serverErrMsg if not empty  */}
        {Object.keys(serverErrMsg).length > 0
          && <p className="text-sm text-red-600">{serverErrMsg.failed}</p> 
        }

        <div className="flex flex-col gap-2  w-60">
          <label htmlFor="username">Username:</label>
          <input id="username" name="username" type="text" placeholder="Username" className="input" />
        </div>

        <div className="flex flex-col gap-2  w-60">
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" placeholder="Password" className="input" />
        </div>

        <button 
          className="btn btn-primary"
          type="submit"
          >
            Log in
        </button>

        <p className="text-xs m-auto">
          No account yet? 
          <Link 
            to="/register"
          > 
            <span 
              className="underline text-blue-600 px-1"
            >
              register 
            </span>
          </Link>
              here
        </p>
      </form>
    </div>
  ) 
}

export default Login;