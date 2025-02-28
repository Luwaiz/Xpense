import { create } from "zustand";

const AuthStore = create((set) => ({
	token: "",
	setToken: (token) => set({ token }),
}));

export default AuthStore;
