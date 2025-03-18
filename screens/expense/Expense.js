import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import InputContainer from "../../components/InputContainer";
import { Dropdown } from "react-native-element-dropdown";
import ActiveButton from "../../components/ActiveButton";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../../hooks/Colours";
import AuthStore from "../../hooks/ZustandStore";
import axios from "axios";
import API from "../../hooks/API";
import AddSuccessModal from "../../components/AddSucceessModal";

const Expense = () => {
	const [name, setName] = useState("");
	const [category, setCategory] = useState(null);
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState(0);
	const [budget, setBudget] = useState([]);
	const [selectedBudget, setSelectedBudget] = useState("");
	const [error, setError] = useState(null);
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);

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
	const token = AuthStore((state) => state.token);

	const createExpense = async (category) => {
		setLoading(true);
		if (category === null) {
			alert("Please select a category");
			setLoading(false);
		} else if (name === "" || amount === 0) {
			alert("Please enter all fields");
			setLoading(false);
		} else {
			const request = {
				name: name.trim(),
				category: category.trim(),
				description: description.trim(),
				budgetId: selectedBudget,
				amount: amount,
				date: Date.now(),
			};
			const header = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const response = await axios.post(API.createExpense, request, header);
				console.log(response.data);
				setLoading(false);
				setModal(true);
			} catch (error) {
				console.error(error.response.data);
				alert("Failed to add expense");
				setLoading(false);
			}
		}
	};

	const getBudgets = async () => {

		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(API.getBudgets, header);
			const formattedBudgets = response?.data?.map((budget) => ({
				label: budget.name, // Display name in dropdown
				value: budget._id, // Store budget ID
			}));
			setBudget(formattedBudgets);
		} catch (e) {
			console.log(e.response.data.message);
			if (e.response.data.message === "No budgets found.") {
				setBudget([{ label: "No budget available", value: "" }]);
			}
		}
	};
	
	useEffect(() => {
		getBudgets();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Text style={styles.text2}>How much?</Text>
				<View style={styles.InputContainer}>
					<Text style={styles.text1}>₦</Text>
					<TextInput
						style={styles.input}
						cursorColor={"white"}
						placeholder="0"
						placeholderTextColor={"white"}
						keyboardType="numeric"
						onChangeText={(text) => setAmount(text)}
					/>
				</View>
			</View>
			<View style={styles.sheet}>
				<InputContainer
					placeholder={"Expense name"}
					onChangeText={(text) => setName(text)}
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
				<Dropdown
					style={styles.dropdown}
					placeholderStyle={styles.placeholderStyle}
					selectedTextStyle={styles.selectedTextStyle}
					inputSearchStyle={styles.inputSearchStyle}
					iconStyle={styles.iconStyle}
					data={budget} // Use formatted budgets
					maxHeight={300}
					labelField="label"
					valueField="value"
					placeholder="Select Budget"
					value={selectedBudget}
					onChange={(item) => {
						setSelectedBudget(item?.value);
					}}
				/>

				<InputContainer
					placeholder={"Description"}
					multiline={true}
					onChangeText={(text) => setDescription(text)}
				/>
				<View style={styles.attachment}>
					<Feather name="paperclip" size={20} color={colors.greyText} />
					<Text style={styles.attachmentText}>Attachments</Text>
				</View>
				<View style={styles.button}>
					<ActiveButton
						text={"Continue"}
						onPress={() => createExpense(category)}
						loading={loading}
					/>
				</View>
			</View>
			{modal && (
				<AddSuccessModal
					modal={modal}
					setModal={setModal}
					text={"Expense Recorded Successfully!"}
				/>
			)}
		</View>
	);
};

export default Expense;
