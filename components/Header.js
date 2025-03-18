import {
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../hooks/Colours";

const Header = ({ title, color }) => {
	const navigation = useNavigation();
	const navigateBack = () => {
		navigation.goBack();
	};
	return (
		<SafeAreaView style={[styles.container,{backgroundColor: title ==="Expense" || title ==="Budgets" || title === "ExpenseDetails" || title === "Verification"? colors.primary : "white"}]}>
			<TouchableOpacity onPress={navigateBack}>
				<AntDesign name="arrowleft" size={24} color={title ==="Expense" || title ==="Budgets" || title === "ExpenseDetails" || title === "Verification" ? "white" : "black"} />
			</TouchableOpacity>
			<Text style={[styles.title,{color:title ==="Expense" || title ==="Budgets" || title === "ExpenseDetails" || title === "Verification" ? "white" : "black"}]}>{title}</Text>
		</SafeAreaView>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		height: 80,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginHorizontal: "auto",
	},
});
