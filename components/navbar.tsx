'use client'
import Link from "next/link";
import { NavUser } from "./nav-user";
import { ModeToggle } from "./theme-mode-toggle";
import { useAuth } from "@/hooks/use-auth";
// import { getSession } from "@/lib/session";


export default function Navbar() {
	// const session = await getSession()
	const { user } = useAuth()
	console.log("User", user);

	return (
		<div className="fixed top-0 z-50 w-full border-b bg-background/50 backdrop-blur">
			<div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
				<div>
					<Link href={'/'} className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-300 hover:opacity-80 transition-opacity">
						Cuilin
					</Link>
				</div>

				<div className="flex gap-2 items-center">
					<ModeToggle />
					<NavUser user={user} />
				</div>
			</div>
		</div>

	)
}
