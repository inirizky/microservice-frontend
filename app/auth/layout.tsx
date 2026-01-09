'use client'
import { useRequireAuth } from "@/lib/session";
import { redirect } from "next/navigation"

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { isReady, isLoggedIn } = useRequireAuth();

	if (!isReady || isLoggedIn) {
		return <div>Loading...</div>;
	}
	return <section>{children}</section>
}