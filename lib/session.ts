import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");

	// Debug logging
	console.log("Token from cookie:", token);

	if (!token) {
		console.log("No token found in cookies");
		return null;
	}

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
			method: "GET",
			headers: {
				"Cookie": `token=${token.value}`,
			},
			credentials: "include", // WAJIB untuk cross-origin cookies
			cache: "no-store",
		});

		console.log("Response status:", response.status);

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Get session error:", error);
		return null;
	}
}
export async function requireAuth() {
	const session = await getSession();

	if (!session) {
		// Redirect ke login kalau belum login
		redirect("/auth/login");
	}

	return session;
}