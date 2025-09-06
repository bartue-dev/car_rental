import RegisterForm from "@/components/auth/register-form"
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { Toaster, toast } from "sonner"
import axios from "@/api/axios";

const RegisterSchema = z.object({
  username: z.string().min(2, "Username must be atleast 2 characters or more"),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/, "Password must be atleast 4 characters or more and must contain number, symbols and letters")
});

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

  const onSubmit = async (data: RegisterData) => {
    try {
      
      const response = await axios.post("/v1/register", {
        username: data.username,
        password: data.password
      }, {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
      });

      setServerError({})

      console.log("REGISTER:", response)
      toast.success("Account register successfully")
      reset();
    } catch (err) {
      console.error(err);

      /* Server errors */
      const error = err as {status: number, response: { data: { message: string }}}
      const validateServer = {} as {error:string}

      if (!error?.status) {
        validateServer.error = "No server response"
      } else if (error?.response?.data?.message.split(":")[0] === "P2002") {
        validateServer.error = "Username already exist"
        console.log("DUPLICATE")
      } else if (error?.status === 400) {
        validateServer.error = "Failed to create an account"
      } else {
        validateServer.error = "Failed"
      }

      if (Object.keys(validateServer).length > 0) {
        setServerError(validateServer)
      }
    }
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