import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Alert,
	Modal,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import DatePicker from "react-native-date-picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import AuthStore from "../hooks/ZustandStore";
import API from "../hooks/API";
import ActiveButton from "./ActiveButton";
import InActiveButton from "./InActiveButton";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "../hooks/Colours";
import { fromByteArray } from "base64-js"; // ✅ Use base64-js for encoding
import Share from "react-native-share"; // ✅ Ensure correct importimport { fromByteArray } from "base64-js";

const { width, height } = Dimensions.get("window");

const DownloadExpense = ({ modal, setModal }) => {
	const token = AuthStore((state) => state.token);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [openStartPicker, setOpenStartPicker] = useState(false);
	const [openEndPicker, setOpenEndPicker] = useState(false);
	const [category, setCategory] = useState("");

	const Categories = [
		{
			label: "All Categories",
			value: "All Categories",
		},
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

	// Download function with date filter
	const downloadFile = async (fileType) => {
		console.log(`📥 Downloading ${fileType} file...`);
	
		try {
			let url = `${API.downloadExcel}/export/${fileType}`;
			const params = new URLSearchParams();
	
			params.append("startDate", startDate.toISOString().split("T")[0]);
			params.append("endDate", endDate.toISOString().split("T")[0]);
			if (category && category !== "All Categories") params.append("category", category);
	
			url += `?${params.toString()}`;
			console.log("🛠 Final API URL:", url);
	
			const response = await axios.get(url, {
				headers: { Authorization: `Bearer ${token}` },
				responseType: "arraybuffer",
			});
	
			console.log("📄 Downloaded Data Length:", response.data?.byteLength || "No Data");
	
			if (!response.data || response.data.byteLength === 0) {
				throw new Error("Received empty file. Please check the selected filters.");
			}
	
			// ✅ Ensure the file has the correct `.xlsx` extension
			const fileUri = `${FileSystem.documentDirectory}expenses.${fileType === "excel" ? "xlsx" : "pdf"}`;
	
			// ✅ Convert ArrayBuffer to Base64 using base64-js
			const base64Data = fromByteArray(new Uint8Array(response.data));
	
			await FileSystem.writeAsStringAsync(fileUri, base64Data, {
				encoding: FileSystem.EncodingType.Base64,
			});
	
			Alert.alert("✅ Download Successful", `File saved at: ${fileUri}`);
	
			// ✅ Ensure correct MIME type for Excel
			await Share.open({
				url: fileUri,
				type: fileType === "pdf" 
					? "application/pdf" 
					: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
		} catch (error) {
			console.log("🚨 Download Error:", error.response?.data || error);
			Alert.alert("❌ Download Failed", "Unable to download file.");
		}
	};
	return (
		<Modal
			visible={modal}
			style={styles.modalCont}
			transparent
			statusBarTranslucent
		>
			<TouchableWithoutFeedback onPress={() => setModal(false)}>
				<View style={styles.modal}>
					<View style={styles.container}>
						<Text
							style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
						>
							Download Expense Report
						</Text>

						{/* Start Date Picker */}
						<TouchableOpacity
							style={styles.datePicker}
							onPress={() => setOpenStartPicker(true)}
						>
							<Text style={styles.boldText}>
								📅 Start Date:{" "}
								<Text style={{ fontWeight: "300", marginLeft: "auto" }}>
									{startDate.toDateString()}
								</Text>
							</Text>
						</TouchableOpacity>
						<DatePicker
							modal
							open={openStartPicker}
							date={startDate}
							mode="date"
							onConfirm={(date) => {
								setOpenStartPicker(false);
								setStartDate(date);
							}}
							onCancel={() => setOpenStartPicker(false)}
						/>

						{/* End Date Picker */}
						<TouchableOpacity
							style={styles.datePicker}
							onPress={() => setOpenEndPicker(true)}
						>
							<Text style={styles.boldText}>
								📅 End Date:
								<Text style={{ fontWeight: "300", marginLeft: "auto" }}>
									{endDate.toDateString()}
								</Text>
							</Text>
						</TouchableOpacity>
						<DatePicker
							modal
							open={openEndPicker}
							date={endDate}
							mode="date"
							onConfirm={(date) => {
								setOpenEndPicker(false);
								setEndDate(date);
							}}
							onCancel={() => setOpenEndPicker(false)}
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

						{/* Download Buttons */}
						<ActiveButton
							onPress={() => downloadFile("excel")}
							text={"Download as Excel"}
							width={"100%"}
						/>
						<InActiveButton
							text={"Download as PDF"}
							width={"100%"}
							onPress={() => downloadFile("pdf")}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

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
	datePicker: {
		marginBottom: 12,
		padding: 10,
		backgroundColor: colors.secondaryGrey,
		borderRadius: 8,
		width: "100%",
		height: 48,
		justifyContent: "center",
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
	boldText: {
		fontWeight: "bold",
		fontSize: 14,
	},
});
export default DownloadExpense;
