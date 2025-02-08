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

const Header = ({ title }) => {
	const navigation = useNavigation();
	const navigateBack = () => {
		navigation.goBack();
	};
	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity onPress={navigateBack}>
				<AntDesign name="arrowleft" size={24} color="black" />
			</TouchableOpacity>
			<Text style={styles.title}>{title}</Text>
		</SafeAreaView>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ffff",
		height: 80,
		// paddingTop: StatusBar.currentHeight,
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
