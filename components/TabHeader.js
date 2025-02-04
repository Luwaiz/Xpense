import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const TabHeader = ({ route }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.homeContainer}>
				<View style={styles.circle}></View>
				<View >
					<Text style={styles.Name}>Hi, Florence</Text>
					<Text style={styles.balance}>Balance:# 302,2882.90</Text>
				</View>
			</View>
			{/* <View style={styles.innerContainer}>
				<AntDesign name="arrowleft" size={24} color="black" />
				<Text style={styles.name}>{route.name}</Text>
			</View> */}
		</SafeAreaView>
	);
};

export default TabHeader;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#f2Ffff",
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
		borderColor: "#007bff",
	},
	homeContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap:10,
	},
	Name: {
		fontSize: 14,
	},
	balance:{
		fontSize:16,
		fontWeight:"bold"
	}
});
