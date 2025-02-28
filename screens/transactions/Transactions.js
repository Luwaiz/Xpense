import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextComponent,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import AuthStore from "../../hooks/ZustandStore";
import axios from "axios";
import API from "../../hooks/API";
import AllTransactions from "../allTransactions/AllTransactions";

const Transactions = ({ navigation }) => {
	const [selected, setSelected] = useState("Transactions");
	const [loading, setLoading] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [option, setOption] = useState("Weekly");
	const [barChart, setBarChart] = useState([]);
	const [error, setError] = useState(null);

	const token = AuthStore((state) => state.token);

	const getExpense = async () => {
		setLoading(true);
		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(API.getExpense, header);
			setTransactions(response.data);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const weeklyExpenses = async () => {
		setLoading(true);
		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(API.weeklyExpenses, header);
			setBarChart(response.data.weeklyData);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const monthlyExpenses = async () => {
		setLoading(true);
		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(API.monthlyExpenses, header);
			setBarChart(response.data.yearlyData);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const viewChart = () => {
		navigation.navigate("Chart");
	};

	useEffect(() => {
		if (option === "Weekly") {
			weeklyExpenses();
		} else if (option === "Monthly") {
			monthlyExpenses();
		} else {
			return null;
		}
	}, [option]);

	useEffect(() => {
		getExpense();
	}, []);

	const ViewAll = () => {
		navigation.navigate("AllTransactions");
	};
	return (
		<View style={styles.container}>
			<AllTransactions viewChart={viewChart} />
		</View>
	);
};

export default Transactions;
