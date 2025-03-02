import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../hooks/Colours";

const InActiveButton = ({ text, onPress, width, disabled }) => {
	return (
		<TouchableOpacity
			style={[styles.box, { width }]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

export default InActiveButton;

const styles = StyleSheet.create({
	box: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 10,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		borderColor: colors.primary,
		borderWidth: 1,
		minWidth: 100,
	},
	text: { color: colors.primary, fontSize: 16, fontWeight: "bold" },
});
