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

				<View style={styles.button}>
					<ActiveButton
						text={"Continue"}
						onPress={createBudget}
						loading={loading}
					/>
				</View>
			</View>

			{modal && (
				<AddSuccessModal
					modal={modal}
					setModal={setModal}
					text={"Budget Created Successfully!"}
				/>
			)}
		</View>
	);
};

{
	/* Start Date Picker
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
/> */
}

export default Income;
