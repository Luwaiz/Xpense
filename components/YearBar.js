import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../hooks/Colours";

const YearBar = () => {
	const [selected, setSelected] = useState("Week");
	const sectors = ["Week", "Month", "Year"];
	return (
		<View style={styles.container}>
		
			{sectors.map((item, index) => (
				<Pressable
					key={index}
					style={[
						styles.bar,
						{ backgroundColor: selected === item ? colors.primary : "white" },
					]}
					onPress={() => setSelected(item)}
				>
					<Text
						style={[
							styles.text,
							{ color: selected === item ? "white" : "black" },
						]}
					>
						{item}
					</Text>
				</Pressable>
			))}
		</View>
	);
};

export default YearBar;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "90%",
		borderRadius: 10,
		justifyContent: "space-between",
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
