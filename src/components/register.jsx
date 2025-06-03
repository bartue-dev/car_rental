import { useState } from "react";
import axios from "../api/axios";

function Register() {
  const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/
  const [errorMsg, setErrorMsg] = useState({});
  const [serverError, setServerError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let validationMsg = {};

      const formData = new FormData(e.target);

      const username = formData.get("username");
      if (username.length < 4) {
        validationMsg.username = "Username must be atleast 4 or more characters"
      }

      const password = formData.get("password");
      if (!PASSWORD_REGEX.test(password)) {
        validationMsg.password = "Password must be atleast 4 characters or more and must contain number, symbols and letters"
      }

      if (Object.keys(validationMsg).length > 0) {
        setErrorMsg(validationMsg);
        return;
      }

      setErrorMsg({})
      setServerError({})

      const response = await axios.post(
        "/v1/register",
        JSON.stringify({username, password}),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      console.log("register response:", response)
      e.target.reset();
    } catch (error) {
      console.error("ERROR", error);
      console.error("ERROR RESPONSE", error.response);


      let validateServer = {};

      const serverError = error.response.data;
      console.log("Server Error:", serverError)
      validateServer.serverError = serverError
      setServerError(validateServer)
  
    }
  }
  
  return (
    <div>
     
      <form 
        className="flex flex-col border border-gray-400 rounded-md m-auto mt-10 gap-4 w-fit px-10 py-5"
        onSubmit={handleSubmit}
      >
        <h1 className="m-auto font-bold text-3xl">Register</h1>

        <div className="w-60 ">
          {Object.keys(serverError).length > 0 &&
          serverError?.serverError?.errors ?
            serverError.serverError.errors.map((error, index) => {
            return (
                <p key={index}>
                  <span className="text-sm text-red-600">{error.msg}</span>
                </p>
            )}) :
            serverError?.serverError?.message && (
              <p>{serverError.serverError.message}</p>
            )   
          }
        </div>

        <div className="flex flex-col gap-2  w-60">
          <label htmlFor="username">Username:</label>
          <input id="username" name="username" type="text" placeholder="Username" className="input" />
          {errorMsg.username && <p className="text-xs text-red-600">{errorMsg.username}</p>}
        </div>

        <div className="flex flex-col gap-2  w-60">
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" placeholder="Password" className="input" />
          {errorMsg.password && <p className="text-xs text-red-600">{errorMsg.password}</p>}
        </div>

        <button 
          className="btn btn-primary"
          type="submit"
          >
            Register
        </button>
      </form>
    </div>
  )
}

export default Register;