// src/lib/axiosInstance.ts
import axios from "axios";

// Helper untuk ambil token JWT dari localStorage
const getToken = () => typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL, // otomatis gabung ke /api/users
	headers: { "Content-Type": "application/json" },
	// withCredentials tidak perlu lagi karena pakai JWT
});

const links = axios.create({
	baseURL: process.env.NEXT_PUBLIC_LINKS_SERVICES,
	headers: { "Content-Type": "application/json" },
});

// ================= REQUEST INTERCEPTOR =================

api.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

links.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
const handleError = (error: any) => {
	const msg = error.response?.data?.message || error.message || "Terjadi kesalahan jaringan";
	return Promise.reject(new Error(msg));
};

api.interceptors.response.use((res) => res, handleError);
links.interceptors.response.use((res) => res, handleError);

export { api, links };
