import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../hooks/Colours";
import { useNavigation } from "@react-navigation/native";

const TabHeader = ({ route }) => {
	
	const navigation = useNavigation();
	const navigateBack = () => {
		navigation.goBack();
	};
	return (
		<SafeAreaView style={styles.container}>
			{route.name === "Home" ? (
				<View style={styles.homeContainer}>
					<View style={styles.circle}></View>
					<View>
						<Text style={styles.Name}>Hi, Florence</Text>
						<Text style={styles.balance}>Balance: ₦ 302,2882.90</Text>
					</View>
				</View>
			) : (
				<View style={styles.innerContainer}>
					<TouchableOpacity onPress={() => navigateBack()}>
						<AntDesign name="arrowleft" size={24} color="black" />
					</TouchableOpacity>
					<Text style={styles.name}>{route.name}</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

export default TabHeader;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		justifyContent: "center",
	},
	innerContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	name: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginHorizontal: "auto",
		paddingRight: 10,
	},
	circle: {
		height: 50,
		width: 50,
		borderRadius: 25,
		backgroundColor: "#fff",
		borderWidth: 3,
		borderColor: colors.primary,
	},
	homeContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	Name: {
		fontSize: 14,
	},
	balance: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
