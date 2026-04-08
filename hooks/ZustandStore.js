import { create } from "zustand";
import axios from "axios";
import API from "./API";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthStore = create((set, get) => ({
	token: "",
	name: "",
	avatar: "",
	email: "",
	password: "",
	setToken: (token) => {
		set({ token });
		AsyncStorage.setItem("token", token);
	},
	setName: (name) => set({ name }),
	setAvatar: (avatar) => set({ avatar }),
	setEmail: (email) => set({ email }),
	setPassword: (password) => set({ password }),

	// Cached data
	recentExpenses: [],
	budgets: [],
	transactions: [],
	weeklyData: [],
	monthlyData: [],
	setRecentExpenses: (recentExpenses) => set({ recentExpenses }),
	setBudgets: (budgets) => set({ budgets }),
	setTransactions: (transactions) => set({ transactions }),

	// Fetch actions — call these after any mutation to instantly update all screens
	refreshRecentExpenses: async () => {
		const token = get().token;
		try {
			const response = await axios.get(API.getRecentExpenses, {
				headers: { Authorization: `Bearer ${token}` },
			});
			set({ recentExpenses: response.data });
		} catch (e) {
			console.log("refreshRecentExpenses error", e);
		}
	},
	refreshBudgets: async () => {
		const token = get().token;
		try {
			const response = await axios.get(API.getBudgets, {
				headers: { Authorization: `Bearer ${token}` },
			});
			set({ budgets: [...response.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
		} catch (e) {
			console.log("refreshBudgets error", e);
		}
	},
	refreshTransactions: async () => {
		const token = get().token;
		try {
			const response = await axios.get(API.getExpense, {
				headers: { Authorization: `Bearer ${token}` },
			});
			set({ transactions: response.data });
		} catch (e) {
			console.log("refreshTransactions error", e);
		}
	},
	refreshWeeklyData: async () => {
		const token = get().token;
		try {
			const response = await axios.get(API.weeklyExpenses, {
				headers: { Authorization: `Bearer ${token}` },
			});
			set({ weeklyData: response.data.weeklyData });
		} catch (e) {
			console.log("refreshWeeklyData error", e);
		}
	},
	refreshMonthlyData: async () => {
		const token = get().token;
		try {
			const response = await axios.get(API.monthlyExpenses, {
				headers: { Authorization: `Bearer ${token}` },
			});
			set({ monthlyData: response.data.yearlyData });
		} catch (e) {
			console.log("refreshMonthlyData error", e);
		}
	},

	logout: () => {
		AsyncStorage.removeItem("token");
		set({ token: "", name: "", avatar: "", email: "", recentExpenses: [], budgets: [], transactions: [], weeklyData: [], monthlyData: [] });
	},
}));

export default AuthStore;
