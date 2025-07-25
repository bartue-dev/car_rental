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
import { Link } from "react-router-dom"
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react"

export function LoginForm({onSubmit, serverErrMsg, setIsGuest, setIsAdmin, formRef}) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl"> <span className="underline underline-offset-2">Login</span> to your account</CardTitle>
          <CardDescription>
          Enter your username and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>

        {/* display serverErrMsg if not empty  */}
        {Object.keys(serverErrMsg).length > 0
          && <p className="text-sm text-red-600 mb-5">{serverErrMsg.failed}</p> 
        }
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username" className="text-base">Username</Label>
                <Input id="username" type="text" name="username" className="py-5"/>
              </div>
              <div className="grid gap-3 relative">
                <Label htmlFor="password" className="text-base">Password</Label>
                <Input id="password" type={showPassword ? "text" : "password"} name="password" className="py-5"/>
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute top-11 right-3 cursor-pointer"
                >
                  {showPassword
                    ? <Eye/>
                    : <EyeOff/>}
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full text-base py-5">
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-base py-5 shadow-md cursor-pointer"
                  type="button"
                  onClick={() => setIsGuest(true)}
                >
                  Login as guest
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-base py-5 shadow-md cursor-pointer"
                  type="button"
                  onClick={() => setIsAdmin(true)}
                >
                  Login as admin
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
  );
}
