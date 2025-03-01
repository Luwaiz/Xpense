import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../hooks/Colours";

const YearBar = ({setOption,option, sector}) => {
	const sectors = ["Weekly"];
	return (
		<View style={styles.container}>
				<View
					style={[
						styles.bar,
						{ backgroundColor: colors.primary},
					]}
				>
					<Text
						style={[
							styles.text,
							{ color:"white" },
						]}
					>
						{sector}
					</Text>
				</View>
		</View>
	);
};

export default YearBar;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "90%",
		borderRadius: 10,
		justifyContent: "center",
		height: 45,
		padding: 5,
		marginVertical: 20,
		borderColor: colors.secondaryGrey,
		borderWidth: 1,
	},
	text: {
		fontSize: 16,
		fontWeight: "500",
		textAlign: "center",
	},
	bar: {
		width: "32%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
});
