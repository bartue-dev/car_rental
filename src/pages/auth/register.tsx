import RegisterForm from "@/components/auth/register-form"
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { Toaster, toast } from "sonner"
import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/lib/types";
import axios from "@/api/axios";

//RegisterSchema validation
const RegisterSchema = z.object({
  username: z.string().min(2, "Username must be atleast 2 characters or more"),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/, "Password must be atleast 4 characters or more and must contain number, symbols and letters")
});

//infer the RegisterSchema to be the a type for RegisterData
type RegisterData = z.infer<typeof RegisterSchema>;

//Register component page
export default function Register() {
  const [serverError, setServerError] = useState<{error?: string}>({})

  const { 
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema)
  });

  //tanstack react query, useMutation method
  const {mutate: registerUser} = useMutation({
    mutationFn: async (data: RegisterData) => {
       //post api request using axios 
      //note: axios is for public api request
      return await axios.post("/v1/register", {
        username: data.username,
        password: data.password
      }, {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
      });
    },
    onSuccess: () => {
      //clear the serverError state
      setServerError({})

      //toast is a like a pop up notification
      //along with Toaster render the message 
      toast.success("Account register successfully")
      reset();
    },
    onError: (error : ApiError) => {
      console.error(error);

      /* Server errors */
      const validateServer = {} as {error:string}

      if (!error?.status) {
        //if server is not running
        validateServer.error = "No server response"
      } else if (error?.response?.data?.message.split(":")[0] === "P2002") {
        //if username is already exist
        validateServer.error = "Username already exist"
      } else if (error?.status === 400) {
        //if status is equal to 400
        validateServer.error = "Failed to create an account"
      } else {
        //if none of the if statements but also failed
        validateServer.error = "Failed"
      }

      //if validateServer object is not empty set the serverError state
      if (Object.keys(validateServer).length > 0) {
        setServerError(validateServer)
      }
    }
  })

  //onSubmit function
  const onSubmit = (data: RegisterData) => {
    registerUser(data)
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Toaster position="top-center"/>
        <RegisterForm
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          serverError={serverError}
        />
      </div>
    </div>
  )
}