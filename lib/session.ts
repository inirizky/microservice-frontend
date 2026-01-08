import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");

	if (!token) {
		console.log("hit");

		return null;
	}

	try {
		// Call backend API untuk verify token dan ambil user data
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
			method: "GET",
			headers: {
				Cookie: `token=${token.value}`,
			},
			cache: "no-store",
		});

		console.log(response);

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

export async function requireAuth() {
	const session = await getSession();

	if (!session) {
		// Redirect ke login kalau belum login
		redirect("/auth/login");
	}

	return session;
}