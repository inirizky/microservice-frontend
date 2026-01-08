'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import Link from "next/link"

const signupSchema = z
  .object({
    name: z.string().min(3, ({ message: "Minimal 3 karakter" })),
    username: z.string().min(3, { message: "Masukkan username yang valid" }),
    password: z.string().min(8, { message: "Minimal 8 karakter" }),
    confirmPassword: z.string().min(8, { message: "Minimal 8 karakter" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  })

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { signUp } = useAuth()
  const router = useRouter()
  const onSubmit = async (values: any) => {

    const res = await signUp(values.username, values.password, values.name)
    console.log(res);

    if (res.success) {
      toast.success(res.message)
      router.replace("/auth/login")
    } else {
      toast.error(res.message)
    }

    // const { data, error } = await sign({
    //   email: values.email,
    //   name: values.name,
    //   password: values.password
    // })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to create your account
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="John doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          // placeholder="your username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          Must be at least 8 characters long.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                </Button>



                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="underline">
                    Sign in
                  </Link>
                </p>
              </form>
            </Form>
          </div>

          <div className="bg-muted relative hidden md:block">
            <img
              src="https://assets.nflxext.com/ffe/siteui/vlv3/024bfb98-9e9d-441d-9c5f-d2c798d8e42f/web/ID-en-20251013-TRIFECTA-perspective_95f30d1e-eb4b-4d51-b68b-0f2a7ecd8daa_large.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <p className="px-6 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}
