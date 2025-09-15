import LoginForm from "@/components/auth/login-form";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/api/axios";
import { useState, /* useEffect, */ useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/feature/hooks";
import { setAuth } from "@/feature/auth/auth-slice";
import { setUser } from "@/feature/user/user-slice";
import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/lib/types";

//LoginSchema validation
const LoginSchema = z.object({
  username: z.string().min(2, "Username must be atleast 2 characters or more"),
  password: z.string()
});

type LoginData = z.infer<typeof LoginSchema>;

//Login component
export default function Login() {
  const [serverError, setServerError] = useState<{error?: string}>({});
  /* const [isGuest, setIsGuest] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); */
  const formRef = useRef<HTMLFormElement | null>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
    // setValue
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema)
  });

  //tanstack react query, useMutation method
  const {mutate: loginUser} = useMutation({
    mutationFn: async (data: LoginData) => {
      //clear the serverError state
      setServerError({})

      // if (isGuest) {
      //   setValue("username", "Guest");
      //   setValue("password", "Guest123!")
      //   setIsGuest(false)
      // } else if (isAdmin) {
      //   setValue("username", "Admin");
      //   setValue("password", "Admin12345!")
      //   setIsAdmin(false)
      // }

      //post api request for login enpoint using axios
      const response = await axios.post("/v1/login",
        {
          username: data.username,
          password: data.password
        },
        {
          headers: {"Content-Type": "application/json"},
          withCredentials: true
        });

        return response;
    },
    onSuccess: (response, data) => {
      const accessToken = response?.data?.accessToken;
        const role = response?.data?.account?.role;
        const accountId = response?.data?.account.accountId;

        //save the user data to auth slice
        dispatch(setAuth({
          username: data.username,
          accessToken,
          role,
          accountId
        }));

        //save username and role for user data persistent
        dispatch(setUser({
          username: data.username,
          role
        }))

        //navigate depends of the role after successful login
        if (role === "ADMIN") {
          navigate("/dashboard")
        } else if (role === "USER") {
          navigate("/home")
        }

        reset();      
    },
    onError: (error : ApiError) => {
      console.error(error);

      /* serverErrors */
      const validateServer = {} as {error:string}

      if (!error?.status) {
        //if server is not running
        validateServer.error = "No server response"
      } else if (error?.status === 400) {
        //if status is equal to 400
        validateServer.error = error?.response?.data?.message
      } else {
        //if none of the if statements but also failed
        validateServer.error = "Login failed"
      }

      //if validateServer object is not empty set the serverError state
      if (Object.keys(validateServer).length > 0) {
        setServerError(validateServer)
      }
    }
  })

  const onSubmit = (data: LoginData) => {
    loginUser(data)
  }

  //trigger the form to submit if isGuest or isAdmin is true along with the formRef
  /* useEffect(() => {
    if ((isGuest || isAdmin) && formRef.current) {
      formRef.current.requestSubmit();
    }
  }, [isGuest, isAdmin]) */


  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          serverError={serverError}
          formRef={formRef}
        />
      </div>
    </div>
  )
}