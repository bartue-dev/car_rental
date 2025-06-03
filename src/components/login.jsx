import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

function Login() {
  const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/
  const [serverErrMsg, setServerErrMsg] = useState({});
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const username = formData.get("username");
      const password = formData.get("password");

      setServerErrMsg({})

      const response = await axios.post(
        "/v1/login",
        JSON.stringify({username, password}),
        {
          headers : {"Content-Type" : "application/json"},
          withCredentials: true
        }
      )

      console.log("RESPONSE:", response.data)

      const accessToken = response.data.accessToken;
      const role = response.data.account.role

      setAuth({username, password, accessToken, role})
      
      e.target.reset();

    } catch (error) {
      console.error(error)
      console.log("SERVER ERROR MESSAGE:", serverErrMsg)

      let validationMsg = {}

      if (!error?.response) {
        validationMsg.failed = "No server response!"
      }  else if (error?.response?.status === 400) {
        console.log(error?.response?.data?.message)
        validationMsg.failed = error?.response?.data?.message
      } else {
        validationMsg.failed = "Log in failed"
      }

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

        {Object.keys(serverErrMsg).length > 0
          && <p className="text-sm text-red-600">{serverErrMsg.failed}</p> 

        }

        <div className="flex flex-col gap-2  w-60">
          <label htmlFor="username">Username:</label>
          <input id="username" name="username" type="text" placeholder="Username" className="input" />
          {serverErrMsg.username && <p className="text-xs text-red-600">{serverErrMsg.username}</p>}
        </div>

        <div className="flex flex-col gap-2  w-60">
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" placeholder="Password" className="input" />
          {serverErrMsg.password && <p className="text-xs text-red-600">{serverErrMsg.password}</p>}
        </div>

        <button 
          className="btn btn-primary"
          type="submit"
          >
            Log in
        </button>

      </form>
    </div>
  ) 
}

export default Login;