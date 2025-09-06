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

export default function RegisterForm() {
  return (
    <div  className={cn("flex flex-col gap-6")}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl"> <span className="underline underline-offset-2">Register </span> an account</CardTitle>
          <CardDescription>
          Enter your username and password below to create to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username" className="text-base">Username</Label>
                <Input id="username" type="username" name="username" className="py-5" />
                {/* {errorMsg.username && <p className="text-xs text-red-600">{errorMsg.username}</p>} */}
              </div>
              <div className="grid gap-3 relative">
                <Label htmlFor="password" className="text-base">Password</Label>
                <Input id="password" type="text"/* {showPassword ? "text" : "password"} */ name="password" className="py-5" />
                {/* <button
                  type="button"
                  // onClick={togglePassword}
                  className="absolute right-3 top-11 cursor-pointer"
                >
                  {showPassword
                    ? <Eye/>
                    : <EyeOff/>}
                </button> */}
                {/* {errorMsg.password && <p className="text-xs text-red-600">{errorMsg.password}</p>} */}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full text-base py-5">
                  Register
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              {/* <Link to="/login" className="underline underline-offset-4">
                login
              </Link> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
