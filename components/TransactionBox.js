import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../hooks/Colours";


const TransactionBox = ({ item }) => {
	return (
		<View style={styles.container}>
			<View style={styles.image}></View>
			<View style={styles.description}>
				<Text>{item.item}</Text>
				<Text style={styles.date}>{item.date}</Text>
			</View>
			<Text style={styles.amount}>-{item.amount}</Text>
		</View>
	);
};

export default TransactionBox;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: colors.secondaryGrey,
		padding: 10,
		width: "90%",
		alignSelf: "center",
		borderRadius: 10,
		marginVertical: 5,
		flexDirection: "row",
		alignItems: "center",
	},
	item: {
		marginBottom: 5,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: colors.primary,
	},
	description: {
		flex: 1,
		marginLeft: 10,
		justifyContent: "space-between",
		gap:5
	},
	date: { color: colors.greyText, fontSize: 12 },
	amount: { color: "red" },
});
