import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import API from "../../hooks/API";
import AuthStore from "../../hooks/ZustandStore";
import styles from "./Styles";

const ExpenseDetails = ({route}) => {
	const { expenseId } = route.params;
	const token = AuthStore((state) => state.token);
	const [expense, setExpense] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchExpenseDetails = async () => {
			try {
				const response = await axios.get(`${API.getExpenseById}/${expenseId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
            console.log(response.status,response.data)
				setExpense(response.data);
			} catch (error) {
				console.error("Error fetching expense details:", error.response);
			} finally {
				setLoading(false);
			}
		};
		fetchExpenseDetails();
	}, [expenseId]);

	if (loading) {
		return <ActivityIndicator size="large" color="blue" />;
	}

	return (
		<View style={styles.container}>
			<Text >Name: {expense?.name}</Text>
			<Text>Amount: ₦{expense?.amount}</Text>
			<Text>Category: {expense?.category}</Text>
			<Text>Description: {expense?.description || "No description provided"}</Text>
			<Text>Date: {new Date(expense?.date).toDateString()}</Text>
		</View>
	);
};

export default ExpenseDetails;
