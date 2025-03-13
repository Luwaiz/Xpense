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
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../hooks/Colours";
import axios from "axios";
import API from "../hooks/API";
import AuthStore from "../hooks/ZustandStore";
import InputContainer from "./InputContainer";
import ActiveButton from "./ActiveButton";

const { width, height } = Dimensions.get("window");

const CreateBudget = ({ modal, setModal }) => {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState(0);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const token = AuthStore((state) => state.token);

	const createBudget = async () => {
		Keyboard.dismiss();
		setLoading(true);
		if (amount === 0) {
			alert("Please enter a budget limit");
			setLoading(false);
		} else {
			const request = {
				name,
				limit: amount.trim(),
			};
			const header = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				console.log("started process");
				const response = await axios.post(API.createBudget, request, header);
				console.log(response.data);
				setLoading(false);
				setModal(false);
			} catch (error) {
				console.error(error.response.data);
				alert("Failed to add expense");
				setLoading(false);
			}
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
						<Text style={styles.text1}>Create Budget</Text>
						<Pressable
							onPress={() => setModal(false)}
							style={styles.closeButton}
						>
							<AntDesign name="closecircle" size={30} color={colors.primary} />
						</Pressable>
					</View>

					<InputContainer
						text={"Set Budget Name"}
						placeholder={"Budget Name"}
						onChangeText={(text) => setName(text)}
					/>
					<InputContainer
						text={"Set Budget Limit"}
						placeholder={"Budget Limit ₦"}
						onChangeText={(text) => setAmount(text)}
					/>

					<View style={styles.button}>
						<ActiveButton
							text={"Create"}
							onPress={() => createBudget()}
							loading={loading}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default CreateBudget;

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
	// text2: {
	// 	fontSize: 16,
	// 	color: colors.secondaryGrey,
	// },
	// dropdown: {
	// 	height: 48,
	// 	borderColor: colors.primaryGrey,
	// 	borderWidth: 0.5,
	// 	paddingHorizontal: 10,
	// 	borderRadius: 8,
	// },
	// icon: {
	// 	marginRight: 5,
	// },
	// placeholderStyle: {
	// 	fontSize: 16,
	// 	color: colors.greyText,
	// },
	// selectedTextStyle: {
	// 	fontSize: 16,
	// },
	// iconStyle: {
	// 	width: 20,
	// 	height: 20,
	// 	color: colors.greyText,
	// },
	// inputSearchStyle: {
	// 	height: 40,
	// 	fontSize: 16,
	// },
	// button: {
	// 	marginTop: "auto",
	// },
	// attachment: {
	// 	height: 48,
	// 	borderColor: colors.primaryGrey,
	// 	borderWidth: 0.5,
	// 	paddingHorizontal: 10,
	// 	borderRadius: 8,
	// 	alignItems: "center",
	// 	borderStyle: "dashed",
	// 	marginTop: "auto",
	// 	justifyContent: "center",
	// 	flexDirection: "row",
	// 	gap: 10,
	// },
	// attachmentText: {
	// 	fontSize: 16,
	// 	color: colors.greyText,
	// },
	// datePicker: {
	// 	height: 48,
	// 	borderColor: colors.primaryGrey,
	// 	borderWidth: 0.5,
	// 	paddingHorizontal: 10,
	// 	borderRadius: 8,
	// 	justifyContent: "center",
	// 	marginBottom: 16,
	// },
	// dateText: {
	// 	fontSize: 16,
	// 	color: colors.greyText,
	// },
});
