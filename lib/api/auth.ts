import axios from "axios";
import { api } from "./axios";

export async function login(username: string, password: string) {
	const res = await api.post("/users/login", {
		username,
		password,
	});

	return res.data; // axios sudah parse JSON
}

export async function me() {
	const res = await api.get('/users/me')
	return res.data; // axios sudah parse JSON
}

export async function registerUser(username: string, password: string, fullname: string) {
	const res = await api.post("/users/register", {
		fullname,
		username,
		password,
	});


	return res.data; // axios sudah parse JSON
}
