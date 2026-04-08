import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../hooks/Colours";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/svg/XpenseLogo2.svg";
import AuthStore from "../hooks/ZustandStore";

const ATMCard = () => {
	const name = AuthStore((state) => state.name);
	const email = AuthStore((state) => state.email);

	const today = new Date();
	const formattedDate = today.toLocaleDateString("en-GB", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<LinearGradient
			colors={[colors.cardPurple, "#1A065F"]}
			start={{ x: 0, y: 1 }}
			end={{ x: 2, y: 1 }}
			locations={[0.2, 0.7]}
			style={styles.container}
		>
			<View style={styles.topContainer}>
				<View>
					<Text style={styles.text3}>Account name</Text>
					<Text style={styles.text4}>{name}</Text>
					<Text style={styles.text3}>Email</Text>
					<Text style={styles.text4}>{email}</Text>
				</View>
				<Logo width={50} height={50} />
			</View>
			<View style={styles.bottom}>
				<View style={{ alignItems: "flex-start" }}>
					<Text style={styles.text3}>Today</Text>
					<Text style={styles.text4}>{formattedDate}</Text>
				</View>
			</View>
		</LinearGradient>
	);
};

export default ATMCard;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 10,
		marginVertical: 10,
		shadowColor: "#000",
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 3,
		width: "90%",
		height: "29%",
		alignSelf: "center",
	},
	topContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	cardNumber: {
		marginTop: 10,
	},
	text1: {
		fontSize: 14,
		color: "white",
		fontWeight: "bold",
	},
	text2: {
		fontSize: 16,
		color: "white",
	},
	text3: {
		fontSize: 11,
		color: "rgba(255,255,255,0.7)",
		marginTop: 6,
	},
	text4: {
		fontSize: 16,
		color: "white",
		fontWeight: "500",
	},
	bottom: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: "auto",
		width: "100%",
	},
});
