"use client";

import { PropsWithChildren, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/axios";
import { AuthContext, AuthState } from "@/hooks/use-auth";

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [isReady, setIsReady] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<any | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const signIn: AuthState["signIn"] = useCallback(async (username, password) => {
		try {
			const res = await api.post("/users/login", { username, password });
			const { token, data, message } = res.data;

			setToken(token);
			setUser(data);
			setIsLoggedIn(true);
			setError(null);

			localStorage.setItem("jwt_token", token);

			return { success: true, message };
		} catch (err: any) {
			const msg = err.message || "Terjadi kesalahan";
			setError(msg);
			return { success: false, message: msg };
		}
	}, []);

	const signUp: AuthState["signUp"] = useCallback(async (username, password, fullname) => {
		try {
			const res = await api.post("/users/register", { username, password, fullname });
			return { success: true, message: res.data.message };
		} catch (err: any) {
			const msg = err.message || "Terjadi kesalahan";
			setError(msg);
			return { success: false, message: msg };
		}
	}, []);

	const signOut: AuthState["signOut"] = useCallback(async () => {
		setIsLoggedIn(false);
		setUser(null);
		setToken(null);
		localStorage.removeItem("jwt_token");
		router.refresh();
	}, [router]);

	const restoreSession = useCallback(async () => {
		const storedToken = localStorage.getItem("jwt_token");
		if (!storedToken) {
			setIsReady(true);
			return;
		}

		try {
			const res = await api.get("/users/me", {
				headers: { Authorization: `Bearer ${storedToken}` },
			});
			setUser(res.data);
			setToken(storedToken);
			setIsLoggedIn(true);
		} catch {
			localStorage.removeItem("jwt_token");
		} finally {
			setIsReady(true);
		}
	}, []);

	useEffect(() => {
		restoreSession();
	}, [restoreSession]);

	if (!isReady) return <div>Loading...</div>;

	return (
		<AuthContext.Provider value={{ isReady, isLoggedIn, user, error, signIn, signUp, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};
