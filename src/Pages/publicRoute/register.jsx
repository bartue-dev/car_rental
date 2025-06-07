import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/
  const [errorMsg, setErrorMsg] = useState({});
  const [serverError, setServerError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //validation message obj
      let validationMsg = {};

      //FormData api
      const formData = new FormData(e.target);

      //get the username from the formData
      const username = formData.get("username");

      //if username length is less than 4 save a message to the validation message obj
      if (username.length < 4) {
        validationMsg.username = "Username must be atleast 4 or more characters"
      }

      //get the password from the formData
      const password = formData.get("password");

      //if password not match to PASSWORD_REGEX save a message to the validation message obj
      if (!PASSWORD_REGEX.test(password)) {
        validationMsg.password = "Password must be atleast 4 characters or more and must contain number, symbols and letters"
      }

      //if validation message is not empty save the validation message obj to the errorMsg state
      if (Object.keys(validationMsg).length > 0) {
        setErrorMsg(validationMsg);
        return;
      }

      //clear the previous error messages state
      setErrorMsg({})
      setServerError({})

      //post the username and password in the register enpoint in the backend api
      const response = await axios.post(
      "/v1/register",
      JSON.stringify({username, password}),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      console.log(response)

      //reset the form after successfull register
      e.target.reset();

      navigate("/login")
    } catch (error) {
      console.log("register error:",error)
      //validation server message obj
      let validateServer = {};

      if (error?.code === "ERR_NETWORK") {
        const errorMsg = error?.message
        validateServer.serverError = errorMsg
      } else if (error?.response?.status === 400) {
        const errorMsg = error?.response?.data?.message
        validateServer.serverError = errorMsg.split(":")[1]
      } else {
        const serverError = error?.response?.data;
        validateServer.serverError = serverError
      }

      setServerError(validateServer)
    }
  }

  useEffect(() => {
    console.log("SERVER ERROR",serverError)
  }, [serverError])
  
  return (
    <div>
     
      <form 
        className="flex flex-col border border-gray-400 rounded-md m-auto mt-10 gap-4 w-fit px-10 py-5"
        onSubmit={handleSubmit}
      >
        <h1 className="m-auto font-bold text-3xl">Register</h1>

        <div className="w-60 ">
          {/* if serverError is not empty 
              validate again if serverError.errors(validationErr in the backend) exist 
              if true display array of errors
              if serverError.errors doesnt exist
              validate again if serverError.message exist 
              if true display serverError.message
              if serverError.message doesnt exist 
              validate again if serverError exist 
              if true display serverError.serverError
          */}
          {Object.keys(serverError).length > 0 
            && serverError?.serverError?.errors
              ? serverError?.serverError?.errors.map((error, index) => {
                return (
                    <p key={index}>
                      <span className="text-sm text-red-600">{error.msg}</span>
                    </p>
                )})
              : serverError?.serverError?.message
                ? <p className="text-sm text-red-600">{serverError.serverError.message}</p>
                : serverError?.serverError && <p className="text-sm text-red-600">{serverError.serverError}</p> 
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

        <p className="text-xs m-auto">
          already have an account? 
          <Link to="/login"><span className="underline text-blue-600 px-1"> login </span></Link> 
           here
        </p>
      </form>
    </div>
  )
}

export default Register;