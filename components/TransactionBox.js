import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { parseISO } from "date-fns";
import { colors } from "../hooks/Colours";
import CategoryIcons from "./CategoryIcons";
import { useNavigation } from "@react-navigation/native";
import addComma from "../hooks/AmountFormat";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import API from "../hooks/API";
import AuthStore from "../hooks/ZustandStore";
import EditExpense from "./EditExpense";

const TransactionBox = ({ item, onDeleteExpense }) => {
	const navigation = useNavigation();
	const token = AuthStore((state) => state.token);

	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(false);
	const [longPress, setLongPress] = useState(null); // Track which expense is long-pressed

	// Convert Date for display
	const convertDate = (isoString) => {
		const dateObj = parseISO(isoString);
		return {
			Date: `${dateObj.getDate()}/${
				dateObj.getMonth() + 1
			}/${dateObj.getFullYear()}`,
			Time: `${dateObj.getHours()}:${dateObj
				.getMinutes()
				.toString()
				.padStart(2, "0")}`,
		};
	};

	// Open Expense Details Screen
	const CheckDetails = (expenseId) => {
		if (expenseId) {
			navigation.navigate("ExpenseDetails", { expenseId });
		}
	};

	// Toggle edit/delete buttons on long press
	const dropDown = (id) => {
		setLongPress((prev) => (prev === id ? null : id));
	};

	// Handle Expense Deletion
	const deleteExpense = async (id) => {
		setLoading(true);
		const header = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const expenseId = id;
		try {
			const response = await axios.delete(
				`${API.deleteExpense}/${expenseId}`,
				header
			);
			console.log(response.data);
			onDeleteExpense(id); // Update parent state
			setLongPress(null); // Hide options after deletion
			setLoading(false);
		} catch (error) {
			console.error("Error deleting expense:", error.response);
			setLoading(false);
		}
	};

	// Open Edit Modal
	const editExpense = () => {
		setEditMode(true);
	};

	return (
		<View>
			<TouchableOpacity
				style={styles.container}
				onPress={() => CheckDetails(item?._id)}
				onLongPress={() => dropDown(item?._id)}
			>
				<CategoryIcons category={item?.category} />
				<View style={styles.description}>
					<Text>{item.name}</Text>
					<Text style={styles.category}>{item.category}</Text>
					<Text style={styles.date}>{convertDate(item?.date)?.Date}</Text>
				</View>
				<View style={styles.rightContainer}>
					<Text style={styles.amount}>- {addComma(item?.amount)}</Text>
					<Text style={styles.date}>{convertDate(item?.date)?.Time}</Text>
				</View>
			</TouchableOpacity>

			{/* Show edit/delete options if long-pressed */}
			{longPress === item._id && (
				<View style={styles.editContainer}>
					{loading ? (
						<ActivityIndicator />
					) : (
						<TouchableOpacity onPress={() => deleteExpense(item._id)}>
							<AntDesign name="delete" size={24} color="black" />
						</TouchableOpacity>
					)}
					<TouchableOpacity onPress={editExpense}>
						<Feather name="edit" size={24} color="black" />
					</TouchableOpacity>
				</View>
			)}

			{/* Edit Expense Modal */}
			{editMode && (
				<EditExpense
					modal={editMode}
					setModal={setEditMode}
					id={longPress}
					setLongPress={setLongPress} // Hide dropdown after editing
				/>
			)}
		</View>
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
	category: { color: colors.greyText, fontSize: 12, marginTop: 7 },
	date: { color: colors.greyText, fontSize: 12 },
	amount: { color: "red" },
	rightContainer: {
		justifyContent: "space-between",
		alignItems: "flex-end",
		gap: 20,
	},
	editContainer: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		elevation: 5, // Add shadow effect (Android)
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84, // Adjust positioning if needed
		zIndex: 10, // Ensure it stays on top
		width: "30%",
		marginBottom: 10,
		alignSelf: "flex-end",
		flexDirection: "row",
		justifyContent: "space-between",
		marginRight: 16,
	},
});
