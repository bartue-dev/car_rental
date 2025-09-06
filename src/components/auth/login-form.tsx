import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { LoginPropsType } from "@/lib/types"
import { Eye, EyeOff, LoaderCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"


export default function LoginForm({
  onSubmit,
  handleSubmit,
  register,
  errors,
  isSubmitting,
  serverError,
  formRef
}: LoginPropsType ) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div  className={cn("flex flex-col gap-6")}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            <span className="underline underline-offset-2">Login</span>
            {" "} an account
          </CardTitle>
          <CardDescription>
            Enter your username and password below to <span className="font-semibold">login</span> to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
            <div className="flex flex-col gap-6">

              {/* server error */}
              {serverError?.error && <p className="text-sm text-red-600">{serverError.error}</p> }

              <div className="grid gap-3">
                <Label htmlFor="username" className="text-base">Username</Label>
                <Input 
                  id="username" 
                  type="username" 
                  {...register("username")} 
                  className="py-5"
                />
                {errors?.username 
                  && <p className="text-sm text-red-600">{errors?.username?.message}</p>}
              </div>
              <div className="grid gap-3 relative">
                <Label htmlFor="password" className="text-base">Password</Label>
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  {...register("password")} 
                  className="py-5" 
                />
                <button
                  type="button"
                  className="absolute top-11 right-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  { showPassword
                    ? <Eye/>
                    : <EyeOff/> }
                </button>
                {errors?.password 
                  && <p className="text-sm text-red-600">{errors?.password?.message}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full text-base py-5"
                  disabled={isSubmitting}
                >
                  Login
                  {isSubmitting && <LoaderCircle className="animate-spin"/>}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
