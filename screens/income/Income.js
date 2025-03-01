import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import styles from "./Styles";
import InputContainer from "../../components/InputContainer";
import ActiveButton from "../../components/ActiveButton";
import DatePicker from "react-native-date-picker";
import AuthStore from "../../hooks/ZustandStore";
import AddSuccessModal from "../../components/AddSucceessModal";
import API from "../../hooks/API";
import axios from "axios";

const Income = () => {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState(0);
	const [error, setError] = useState(null);
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [openStartDate, setOpenStartDate] = useState(false);
	const [endDate, setEndDate] = useState(null);
	const [openEndDate, setOpenEndDate] = useState(false);

	const token = AuthStore((state) => state.token);

	const createBudget = async () => {
		setLoading(true);
		if (amount === 0) {
			alert("Please enter a budget limit");
			setLoading(false);
		} else {
			const request = {
				name,
				limit: amount.trim(),
				startDate,
				endDate,
			};
			const header = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const response = await axios.post(API.createBudget, request, header);
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

	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Text style={styles.text2}>Set Budget Limit?</Text>
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
					placeholder={"Budget Name"}
					onChangeText={(text) => setName(text)}
				/>

				{/* Start Date Picker */}
				<TouchableOpacity
					onPress={() => setOpenStartDate(true)}
					style={styles.datePicker}
				>
					<Text style={styles.dateText}>
						{startDate ? startDate.toDateString() : "Choose a start date"}
					</Text>
				</TouchableOpacity>
				<DatePicker
					modal
					open={openStartDate}
					date={startDate || new Date()} // Default to today's date
					mode="date"
					onConfirm={(date) => {
						setOpenStartDate(false);
						setStartDate(date);
					}}
					onCancel={() => setOpenStartDate(false)}
				/>
				<TouchableOpacity
					onPress={() => setOpenEndDate(true)}
					style={styles.datePicker}
				>
					<Text style={styles.dateText}>
						{endDate ? endDate.toDateString() : "Choose an end date"}
					</Text>
				</TouchableOpacity>
				<DatePicker
					modal
					open={openEndDate}
					date={endDate || new Date()} // Default to today's date
					mode="date"
					onConfirm={(date) => {
						setOpenEndDate(false);
						setEndDate(date);
					}}
					onCancel={() => setOpenEndDate(false)}
				/>

				<View style={styles.button}>
					<ActiveButton
						text={"Continue"}
						onPress={createBudget}
						loading={loading}
					/>
				</View>
			</View>

			{modal && <AddSuccessModal modal={modal} setModal={setModal} />}
		</View>
	);
};

// const styles = StyleSheet.create({
// 	datePicker: {
// 		backgroundColor: "#fff",
// 		padding: 10,
// 		borderRadius: 5,
// 		marginTop: 10,
// 		alignItems: "center",
// 	},
// 	dateText: {
// 		color: "#000",
// 		fontSize: 16,
// 	},
// });

export default Income;
