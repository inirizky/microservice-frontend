'use client'
import React from 'react'
import { SidebarContent } from './ui/sidebar'
import { NavMain } from './nav-main'
import { IconChartBar, IconDashboard, IconFolder, IconPackage, IconSettings, IconUsers } from '@tabler/icons-react'
import { NavSecondary } from './nav-secondary'
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Shortlink",
			url: "/dashboard",
			icon: IconDashboard,
		},


	],
	// navClouds: [
	//   {
	//     title: "Capture",
	//     icon: IconCamera,
	//     isActive: true,
	//     url: "#",
	//     items: [
	//       {
	//         title: "Active Proposals",
	//         url: "#",
	//       },
	//       {
	//         title: "Archived",
	//         url: "#",
	//       },
	//     ],
	//   },
	//   {
	//     title: "Proposal",
	//     icon: IconFileDescription,
	//     url: "#",
	//     items: [
	//       {
	//         title: "Active Proposals",
	//         url: "#",
	//       },
	//       {
	//         title: "Archived",
	//         url: "#",
	//       },
	//     ],
	//   },
	//   {
	//     title: "Prompts",
	//     icon: IconFileAi,
	//     url: "#",
	//     items: [
	//       {
	//         title: "Active Proposals",
	//         url: "#",
	//       },
	//       {
	//         title: "Archived",
	//         url: "#",
	//       },
	//     ],
	//   },
	// ],
	navSecondary: [
		// {
		// 	title: "Settings",
		// 	url: "settings",
		// 	icon: IconSettings,
		// },
		// {
		//   title: "Get Help",
		//   url: "#",
		//   icon: IconHelp,
		// },
		// {
		//   title: "Search",
		//   url: "#",
		//   icon: IconSearch,
		// },
	],
	// documents: [
	//   {
	//     name: "Data Library",
	//     url: "#",
	//     icon: IconDatabase,
	//   },
	//   {
	//     name: "Reports",
	//     url: "#",
	//     icon: IconReport,
	//   },
	//   {
	//     name: "Word Assistant",
	//     url: "#",
	//     icon: IconFileWord,
	//   },
	// ],
}

export default function ContentSidebar() {
	return (
		<SidebarContent>
			<NavMain items={data.navMain} />
			{/* <NavDocuments items={data.documents} /> */}
			<NavSecondary items={data.navSecondary} className="mt-auto" />
		</SidebarContent>
	)
}
