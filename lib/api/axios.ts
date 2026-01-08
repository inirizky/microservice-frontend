// src/lib/axiosInstance.ts
import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL, // otomatis gabung ke /api/users
	headers: { "Content-Type": "application/json" },
	withCredentials: true, // penting supaya cookie dikirim otomatis
});
const links = axios.create({
	baseURL: process.env.NEXT_PUBLIC_LINKS_SERVICES, // otomatis gabung ke /api/users
	headers: { "Content-Type": "application/json" },
	withCredentials: true, // penting supaya cookie dikirim otomatis
});

// Interceptor REQUEST
api.interceptors.request.use(
	(config) => {
		// Tidak perlu lagi set Authorization dari localStorage
		return config;
	},
	(error) => Promise.reject(error)
);

// Interceptor RESPONSE
api.interceptors.response.use(
	(response) => response,
	(error) => {
		const msg =
			error.response?.data?.message ||
			error.message ||
			"Terjadi kesalahan jaringan";

		return Promise.reject(new Error(msg));
	}
);
// Interceptor REQUEST
links.interceptors.request.use(
	(config) => {
		// Tidak perlu lagi set Authorization dari localStorage
		return config;
	},
	(error) => Promise.reject(error)
);

// Interceptor RESPONSE
links.interceptors.response.use(
	(response) => response,
	(error) => {
		const msg =
			error.response?.data?.message ||
			error.message ||
			"Terjadi kesalahan jaringan";

		return Promise.reject(new Error(msg));
	}
);

export {
	api, links
};
