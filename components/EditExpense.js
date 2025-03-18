import {
	Dimensions,
	Keyboard,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../hooks/Colours";
import axios from "axios";
import API from "../hooks/API";
import AuthStore from "../hooks/ZustandStore";
import InputContainer from "./InputContainer";
import ActiveButton from "./ActiveButton";
import { Dropdown } from "react-native-element-dropdown";

const { width, height } = Dimensions.get("window");

const EditExpense = ({ modal, setModal, id, setLongPress }) => {
	const [name, setName] = useState(undefined);
	const [category, setCategory] = useState(undefined);
	const [description, setDescription] = useState(undefined);
	const [amount, setAmount] = useState(undefined);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const token = AuthStore((state) => state.token);
	const Categories = [
		{
			label: "Subscription",
			value: "Subscription",
		},
		{
			label: "Transportation",
			value: "Transportation",
		},
		{
			label: "Entertainment",
			value: "Entertainment",
		},
		{
			label: "Food",
			value: "Food",
		},
		{
			label: "Health Insurance",
			value: "Health Insurance",
		},
		{
			label: "Shopping",
			value: "Shopping",
		},
		{
			label: "Others",
			value: "Others",
		},
	];

	const Edit = async () => {
		Keyboard.dismiss();
		setLoading(true);
		console.log("proceeeeg1", id);

		const request = {};

		if (name !== undefined && name !== "") {
			request.name = name;
		}

		if (amount !== undefined && amount !== "") {
			request.amount = amount.trim();
		}
		if (description !== undefined && description !== "") {
			request.description = description;
		}

		if (category !== undefined && category !== "") {
			request.category = category;
		}

		console.log("Processing step 2", request);

		if (Object.keys(request).length === 0) {
			console.error("No valid fields provided for update");
			alert("Please enter a value to update.");
			setLoading(false);
			return;
		}

		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		console.log("processing2", id);
		try {
			console.log("processing", id);
			const expenseId = id;
			const response = await axios.put(
				`${API.updateExpense}/${expenseId}`,
				request,
				header
			);
			console.log(response.data);
			setLoading(false);
			setLongPress(false);
			setModal(false);
		} catch (error) {
			console.error(error.response.data);
			alert("Failed to add expense");
			setLoading(false);
		}
	};

	return (
		<Modal
			visible={modal}
			style={styles.modalCont}
			transparent
			statusBarTranslucent
		>
			<View style={styles.modal}>
				<View style={styles.container}>
					<View style={styles.topContainer}>
						<Text style={styles.text1}>Edit Expense</Text>
						<Pressable
							onPress={() => setModal(false)}
							style={styles.closeButton}
						>
							<AntDesign name="closecircle" size={30} color={colors.primary} />
						</Pressable>
					</View>

					<InputContainer
						text={"Set Expense Name"}
						placeholder={"Expense Name"}
						onChangeText={(text) => setName(text)}
					/>
					<InputContainer
						text={"Set Expense amount"}
						placeholder={"Expense amount ₦"}
						onChangeText={(text) => setAmount(text)}
					/>

					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={Categories}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder="Select category"
						value={category}
						onChange={(item) => {
							setCategory(item.value);
						}}
					/>

					<InputContainer
						placeholder={"Description"}
						multiline={true}
						onChangeText={(text) => setDescription(text)}
					/>

					<View style={styles.button}>
						<ActiveButton
							text={"update"}
							onPress={() => Edit()}
							loading={loading}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default EditExpense;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		width: width - 50,
		padding: 30,
		borderRadius: 16,
	},
	modalCont: {
		flex: 1,
	},
	modal: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		flex: 1,
	},
	modalText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
	},

	InputContainer: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		marginTop: 10,
	},
	topContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 50,
		alignItems: "center",
	},
	text1: {
		fontSize: 24,
		fontWeight: "500",
		marginLeft: "auto",
		marginRight: "auto",
	},
	dropdown: {
		height: 48,
		borderColor: colors.primaryGrey,
		borderWidth: 0.5,
		paddingHorizontal: 10,
		borderRadius: 8,
		marginBottom: 16,
		width: "100%",
	},
	icon: {
		marginRight: 5,
	},
	placeholderStyle: {
		fontSize: 16,
		color: colors.greyText,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
		color: colors.greyText,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	button: {
		marginTop: "auto",
	},
});
