import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { parseISO, formatDate } from "date-fns";
import { colors } from "../hooks/Colours";
import CategoryIcons from "./CategoryIcons";
import { useNavigation } from "@react-navigation/native";

const TransactionBox = ({ item }) => {
	const navigation = useNavigation()
	const convertDate = (isoString) => {
		const dateObj = parseISO(isoString);
		// Extract values
		const day = dateObj.getDate();
		const month = dateObj.getMonth() + 1; // Month is zero-based
		const year = dateObj.getFullYear();
		const hour = dateObj.getHours();
		const minute = dateObj.getMinutes();
		const date = {
			Date: `${day}/${month}/${year}`,
			Time: `${hour}:${minute}`,
		};
		return date;
	};

	const CheckDetails = (expenseId) => {
		console.log("Transaction Details: ", item);
		if (expenseId !== null) {
			navigation.navigate("ExpenseDetails", {
				expenseId,
			});
		}
    };
	return (
		<TouchableOpacity style={styles.container} onPress={()=>CheckDetails(item?._id)}>
			<Text>
				<CategoryIcons category={item?.category} />
			</Text>
			<View style={styles.description}>
				<Text>{item.name}</Text>
				<Text style={styles.category}>{item.category}</Text>

				<Text style={styles.date}>{item && convertDate(item?.date)?.Date}</Text>
			</View>
			<View style={styles.rightContainer}>
				<Text style={styles.amount}>- {item?.amount}</Text>
				<Text style={styles.date}>{item && convertDate(item?.date)?.Time}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default TransactionBox;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: colors.secondaryGrey,
		padding: 10,
		width: "90%",
		alignSelf: "center",
		borderRadius: 10,
		marginVertical: 5,
		flexDirection: "row",
		alignItems: "center",
	},
	item: {
		marginBottom: 5,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: colors.primary,
		borderWidth: 1,
		borderColor: colors.white,
		alignItems: "center",
		justifyContent: "center",
	},
	description: {
		flex: 1,
		marginLeft: 10,
	},
	category: { color: colors.greyText, fontSize: 12 , marginTop: 7,},
	date: { color: colors.greyText, fontSize: 12 },
	amount: { color: "red" },
	rightContainer: {
		justifyContent: "space-between",
		alignItems: "flex-end",
		gap: 20,
	},
});
