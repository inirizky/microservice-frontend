"use client"; // 🚀 ini client component

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/types/user";
// import SignOutButton from "./signout-btn";

type NavUserProps = {
	session: any; // bisa ganti pakai tipe dari next-auth
}

export function NavUser({ user }: { user: User }) {
	const { signOut } = useAuth()


	return (
		(user ?
			(<DropdownMenu>
				<DropdownMenuTrigger>
					<div className="flex gap-2 items-center">

						<Avatar className="h-10 w-10 rounded-full">
							<AvatarImage
								src={undefined}
								alt={"User"}
							/>
							<AvatarFallback className="rounded-lg">CN</AvatarFallback>
						</Avatar>
						<div className="flex flex-col items-start">
							<p>{user.fullname}</p>
							{/* <p className="text-xs text-muted-foreground">{user.username}</p> */}

						</div>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg "
					align="end"
					sideOffset={4}
				>
					<DropdownMenuGroup>

						<DropdownMenuItem asChild>
							<Link href={`/dashboard`}>Dashboard</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={() => signOut()} >
							Logout
						</DropdownMenuItem>
					</DropdownMenuGroup>
					{/* <DropdownMenuGroup>
                   
                    <DropdownMenuItem>
                        <CreditCard />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup> */}
				</DropdownMenuContent>
			</DropdownMenu>) : (
				<Button asChild>

					<Link href={'/auth/login'}>Login</Link>
				</Button>
			))
	)
}