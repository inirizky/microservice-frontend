
import { AppSidebar } from "@/components/app-sidebar"
import {
	SidebarInset,
	SidebarProvider,
} from "@/components/ui/sidebar"
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSession()
	if (!session) {
		redirect('/auth/login')
	}
	// const session = useSession()
	// const router = useRouter()
	// if (!session.data?.user) {
	// 	router.push('/auth/login')
	// }
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