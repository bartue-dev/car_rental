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

export function RegisterForm({onSubmit, serverError, errorMsg}) {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl"> <span className="underline underline-offset-2">Register </span> an account</CardTitle>
          <CardDescription>
          Enter your username and password below to create to your account
          </CardDescription>
        </CardHeader>
        <CardContent>

  
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
                    <div className="w-60 mb-5">
                      <p key={index}>
                        <span className="text-sm text-red-600">{error.msg}</span>
                      </p>
                    </div>
                )})
              : serverError?.serverError?.message
                ? <p className="text-sm text-red-600 mb-5">{serverError.serverError.message}</p>
                : serverError?.serverError && <p className="text-sm text-red-600 mb-5">{serverError.serverError}</p> 
          }

          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username" className="text-base">Username</Label>
                <Input id="username" type="username" name="username" className="py-5" />
                {errorMsg.username && <p className="text-xs text-red-600">{errorMsg.username}</p>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password" className="text-base">Password</Label>
                <Input id="password" type="password" name="password" className="py-5" />
                {errorMsg.password && <p className="text-xs text-red-600">{errorMsg.password}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full text-base py-5">
                  Register
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
