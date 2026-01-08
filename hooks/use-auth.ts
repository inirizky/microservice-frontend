"use client";

import { useContext } from "react";


import { createContext } from "react";

export type AuthState = {
	isReady: boolean;
	isLoggedIn: boolean;
	user: any | null;
	error: string | null;
	signIn: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
	signUp: (username: string, password: string, fullname: string) => Promise<{ success: boolean; message?: string }>;
	signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
	isReady: false,
	isLoggedIn: false,
	user: null,
	error: null,
	signIn: async () => ({ success: false }),
	signUp: async () => ({ success: false }),
	signOut: async () => { },
});


export const useAuth = () => useContext(AuthContext);
