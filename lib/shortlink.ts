import { cookies } from "next/headers";


export default async function getShortLink(slug: string) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");

	if (!token) {
		return null;
	}
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_LINKS_SERVICES}/links/${slug}`, {
			method: "GET",
			headers: {
				Cookie: `token=${token.value}`, // Forward cookie ke backend
			},
			cache: "no-store", // Jangan cache, selalu fresh data
		});

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data; // { id, fullname, username, role }
	} catch (error) {
		console.error("Get session error:", error);
		return null;
	}
}
