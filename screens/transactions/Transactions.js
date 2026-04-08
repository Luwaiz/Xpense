import { View } from "react-native";
import React, { useEffect, useRef } from "react";
import styles from "./Styles";
import AuthStore from "../../hooks/ZustandStore";
import AllTransactions from "../allTransactions/AllTransactions";

const Transactions = ({ navigation }) => {
	const refreshTransactions = AuthStore((state) => state.refreshTransactions);
	const refreshWeeklyData = AuthStore((state) => state.refreshWeeklyData);
	const refreshMonthlyData = AuthStore((state) => state.refreshMonthlyData);
	const transactions = AuthStore((state) => state.transactions);
	const intervalRef = useRef(null);

	const viewChart = () => {
		navigation.navigate("Chart");
	};

	useEffect(() => {
		refreshTransactions(transactions.length > 0);
		refreshWeeklyData();
		refreshMonthlyData();
		intervalRef.current = setInterval(() => {
			refreshTransactions(true);
			refreshWeeklyData();
			refreshMonthlyData();
		}, 30000);
		return () => clearInterval(intervalRef.current);
	}, []);

	return (
		<View style={styles.container}>
			<AllTransactions viewChart={viewChart} />
		</View>
	);
};

export default Transactions;
