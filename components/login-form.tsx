'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

const loginSchema = z.object({
  username: z.string().min(3, { message: "Masukkan username yang valid" }),
  password: z.string().min(6, { message: "Minimal 6 karakter" }),
})

export function LoginForm({ className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const router = useRouter()
  const { signIn, error } = useAuth()



  const onSubmit = async (values: any) => {

    const res = await signIn(values.username, values.password)

    // toast.success("asik")

    console.log(res);

    if (res.success) {
      toast.success(res.message)
      router.replace("/dashboard")
    } else {
      toast.error(res.message)
    }


  }

  const { isSubmitting } = form.formState;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-4">

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="johndoe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        {/* <a
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a> */}
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button disabled={isSubmitting} type="submit" className="w-full">
                  Login
                </Button>

                <FormDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="underline">
                    Sign up
                  </Link>
                </FormDescription>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* <p className="px-6 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </p> */}
    </div>
  )
}
