import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../hooks/Colours";
import TransactionList from "./TransactionList";
import addComma from "../hooks/AmountFormat";
import TransactionBox from "./TransactionBox";

const ExpenseCard = ({ item }) => {
	const formatDate = (isoDate) => {
		if (!isoDate) return "N/A"; // Return a fallback value if date is missing
		const date = new Date(isoDate);
		if (isNaN(date)) return "Invalid Date"; // Handle invalid date formats
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	};

	return (
		<View style={styles.card}>
			<View style={styles.topContainer}>
				<View style={styles.details}>
					<Text style={styles.title}>{item?.day}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>
						{item?.totalAmount && addComma(item?.totalAmount)}
					</Text>
					<Text style={styles.date}>
						{item?.date ? formatDate(item?.date) : "nil"}
					</Text>
				</View>
			</View>
			{item?.expenses &&
				item?.expenses?.map((expense, index) => (
					<TransactionBox item={expense} key={index?.toString()} />
				))}

		</View>
	);
};

export default ExpenseCard;

const styles = StyleSheet.create({
	card: {
		flex: 1,
		width: "100%",
		marginTop: 20,
		borderTopColor: colors.primaryGrey,
		borderTopWidth: 0.5,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: "black",
	},
	category: {
		fontSize: 14,
		color: colors.greyText,
	},
	amountContainer: {
		alignItems: "flex-end",
	},
	amount: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.primaryGrey,
	},
	date: {
		fontSize: 12,
		color: colors.greyText,
	},
	topContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	details: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
