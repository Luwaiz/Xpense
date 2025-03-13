import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TransactionList from "../../components/TransactionList";
import styles from "./Styles";
import AuthStore from "../../hooks/ZustandStore";
import axios from "axios";
import API from "../../hooks/API";
import NoExpense from "../../assets/svg/NoExpense.svg";
import { colors } from "../../hooks/Colours";
import addComma from "../../hooks/AmountFormat";

const ListExpenses = ({ route }) => {
	const { BudgetId } = route.params;
	const [expenses, setExpenses] = useState([]);
	const [budget, setBudget] = useState(null);
	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(false);
	const token = AuthStore((state) => state.token);

	const getExpenses = async () => {
		setLoading(true);
		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			const response = await axios.get(
				`${API.getBudgetCategories}/${BudgetId}`,
				header
			);
			console.log("data:", response.data);
			setBudget(response.data.budget);
			setExpenses(response.data.expenses);
			setLoading(false);
		} catch (err) {
			console.log("Error fetching expenses:", err.response);
			setLoading(false);
		}
	};

	useEffect(() => {
		getExpenses();
	}, []);

	const formatDate = (isoString) => {
		const date = new Date(isoString);
		return date.toLocaleString("en-GB");
	};


	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Text style={styles.BudgetName}>{budget && budget?.name}</Text>

			<Text style={styles.BudgetName}>Limit: {budget && addComma(budget?.limit)}</Text>
			</View>
				<Text style={styles.BudgetTime}>{budget && formatDate(budget?.updatedAt)}</Text>

			{loading ? (
				<ActivityIndicator
					size={30}
					color={colors.primary}
					style={styles.ActivityIndicator}
				/>
			) : expenses.length > 0 ? (
				<TransactionList
					data={expenses}
					fetchData={getExpenses}
					refreshing={refreshing}
				/>
			) : (
				<View style={styles.noExpenseCont}>
					<Text style={styles.noExpenseText}>No Expenses Incurred.</Text>
					<NoExpense width={300} height={300} />
				</View>
			)}
		</View>
	);
};

export default ListExpenses;
