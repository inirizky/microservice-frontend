'use client'
import { AppSidebar } from "@/components/app-sidebar"
import {
	SidebarInset,
	SidebarProvider,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth";
import { useRequireAuth } from "@/lib/session";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isReady, isLoggedIn } = useRequireAuth();

	if (!isReady || !isLoggedIn) {
		return <div>Loading...</div>;
	}
	return (

		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<div className="flex flex-1 flex-col">

					{children}


				</div>

			</SidebarInset>
		</SidebarProvider>
	)
}