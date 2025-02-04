import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../hooks/Colours";

const ActiveButton = ({ text, onPress, width }) => {
	return (
		<TouchableOpacity style={[styles.box, { width }]} onPress={onPress}>
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

export default ActiveButton;

const styles = StyleSheet.create({
	box: {
		backgroundColor: colors.primary,
		padding: 10,
		borderRadius: 10,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		minWidth: 100,
	},
	text: { color: "white", fontSize: 16, fontWeight: "bold" },
});
