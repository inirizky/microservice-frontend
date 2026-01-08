"use client";

import { PropsWithChildren, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, me, registerUser } from "@/lib/api/auth";
import { AuthContext } from "@/hooks/use-auth";
import { toast } from "sonner"
import { Toaster } from "./ui/sonner";
import { api } from "@/lib/api/axios";

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [isReady, setIsReady] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<any | null>(null);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const signIn = async (
		username: string,
		password: string
	): Promise<{ success: boolean; message?: string }> => {
		try {
			const res = await login(username, password);
			setIsLoggedIn(true);
			setUser(res.data);
			return { success: true, message: res.message };
		} catch (err: any) {
			const msg = err.message || "Terjadi kesalahan";
			setError(msg);
			return { success: false, message: msg };
		}
	};

	const signOut = async () => {
		try {
			// Panggil endpoint logout di server, server akan hapus cookie
			await api.post("/users/logout"); // pastikan axios instance pakai withCredentials: true

			// Update state frontend
			setIsLoggedIn(false);
			setUser(null);

			// Redirect ke halaman login
			// router.push("/auth/login");
			router.refresh()
		} catch (err) {
			console.log("Logout gagal:", err);
		}
	};

	const signUp = async (username: string, password: string, fullname: string) => {

		try {
			const res = await registerUser(username, password, fullname);
			console.log(res);

			return { success: true, message: res.message };
		} catch (error: any) {
			const msg = error.message || "Terjadi kesalahan";
			setError(msg);
			return { success: false, message: msg };
		}

	};

	const restoreSession = async () => {
		try {
			// Panggil /me, cookie akan dikirim otomatis
			const data = await me();
			setUser(data); // data dari server {id, username, fullname, role}
			setIsLoggedIn(true);
		} catch (err) {
			console.log("No active session");
		} finally {
			setIsReady(true);
		}
	};


	useEffect(() => {
		restoreSession();
	}, []);

	return (
		<AuthContext.Provider
			value={{ isReady, isLoggedIn, user, error, signIn, signUp, signOut }}
		>
			{children}

		</AuthContext.Provider>
	);
};
