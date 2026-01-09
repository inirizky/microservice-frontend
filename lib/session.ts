// hooks/use-require-auth.ts
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth(redirectTo = "/auth/login") {
	const { isLoggedIn, isReady } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isReady && !isLoggedIn) {
			router.push(redirectTo);
		}
	}, [isLoggedIn, isReady, router, redirectTo]);

	return { isLoggedIn, isReady };
}