import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import Xpense from "../../assets/svg/XpenseLogo.svg";
import API from "../../hooks/API";
import AuthStore from "../../hooks/ZustandStore";
import styles from "./Styles";
import addComma from "../../hooks/AmountFormat";

const ExpenseDetails = ({ route }) => {
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
				console.log(response.status, response.data);
				setExpense(response.data);
			} catch (error) {
				console.error("Error fetching expense details:", error.response.data);
			} finally {
				setLoading(false);
			}
		};
		fetchExpenseDetails();
	}, [expenseId]);

	return (
		<View style={styles.container}>
			{loading && <ActivityIndicator size="large" color="white" />}
			<View style={styles.logo}>
				<Xpense />
			</View>

			<View style={styles.innerContainer}>
				<View style={styles.detailsContainer}>
					<View style={styles.details}>
						<Text style={styles.text}>📝 Name:</Text>
						<Text style={styles.bold}>{expense?.name}</Text>
					</View>
					<View style={styles.details}>
						<Text style={styles.text}>💰 Amount: </Text>
						<Text style={styles.bold}>₦{expense?.amount && addComma(expense?.amount)}</Text>
					</View>
					<View style={styles.details}>
						<Text style={styles.text}>📂 Category:</Text>
						<Text style={styles.bold}>{expense?.category}</Text>
					</View>
					<View style={styles.details}>
						<Text style={styles.text}>📝 Description:</Text>
						<Text style={styles.bold}>
							{expense?.description || "No description provided"}
						</Text>
					</View>
					<View style={styles.details}>
						<Text style={styles.text}>📅 Date:</Text>
						<Text style={styles.bold}>
							{new Date(expense?.date).toDateString() || "Not available"}
						</Text>
					</View>
				</View>

				<View style={styles.separator} />
				<Text style={styles.footer}>Thank you for using our service! 🎉</Text>
			</View>
		</View>
	);
};

export default ExpenseDetails;
