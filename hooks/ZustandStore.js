import { create } from "zustand";

const AuthStore = create((set) => ({
	token: "",
	name: "",
	avatar: "",
	email: "",
	password:"",
	setToken: (token) => set({ token }),
	setName: (name) => set({ name }),
	setAvatar: (avatar) => set({ avatar }),
	setEmail: (email) => set({ email }),
	setPassword: (password) => set({ password }),

	logout: () => set({ token: "", name: "", avatar: "", email: "" }),
}));

export default AuthStore;
