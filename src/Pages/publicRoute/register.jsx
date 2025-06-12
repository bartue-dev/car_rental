import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "@/components/register-form";

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
    <div  className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm 
          onSubmit={handleSubmit}
          serverError={serverError}
          errorMsg={errorMsg}
        />
      </div>
    </div>
  )
}

export default Register;