import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../hooks/Colours";
import { LinearGradient } from "expo-linear-gradient";

const ATMCard = () => {
	return (
		<LinearGradient
			colors={[colors.cardPurple, "#1A065F"]}
			start={{ x: 0, y: 1 }}
			end={{ x: 2, y: 1 }}
			locations={[0.2, 0.7]}
			style={styles.container}
		>
			<View style={{ marginBottom: 20 }}>
				<Text style={styles.text2}>ATMCard</Text>
			</View>
			<Text style={styles.text3}>Card number</Text>
			<Text style={styles.text1}>1231 3221 3221 3221</Text>
			<View style={styles.bottom}>
				<View>
					<Text style={styles.text3}>Card holder name</Text>
					<Text style={styles.text2}>Joe Don</Text>
				</View>
				<View>
					<Text style={styles.text3}>Expiry date</Text>
					<Text style={styles.text2}>12/22</Text>
				</View>
				<View>
					<Text style={styles.text3}>CVV</Text>
					<Text style={styles.text2}>123</Text>
				</View>
			</View>
		</LinearGradient>
	);
};

export default ATMCard;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 30,
		borderRadius: 10,
		marginVertical: 10,
		shadowColor: "#000",
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 3,
		width: "90%",
		height: "29%",
	},
	text1: {
		fontSize: 18,
		color: "white",
		fontWeight: "bold",
	},
	text2: {
		fontSize: 16,
		color: "white",
	},
	text3: {
		fontSize: 10,
		color: "white",
	},
	bottom: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: "auto",
		width: "85%",
	},
});
