import { SignupForm } from "@/components/signup-form"
import { redirect } from "next/navigation"


export default async function SignupPage() {
  // const session = await getSession()
  // if (session?.user) {
  //   redirect('/')
  // }
  return (

    <div className="w-full flex justify-center items-center h-screen p-4 md:p-0">
      <SignupForm />
    </div>

  )
}
