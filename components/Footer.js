import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../hooks/Colours";
import ActiveButton from "./ActiveButton";
import InActiveButton from "./InActiveButton";
const { height, width } = Dimensions.get("window");
const Footer = ({ currentId, Slides, next, NavigateToApp, skip }) => {
	return (
		<View style={styles.container}>
			<View
				style={{
					alignItems: "center",
					flexDirection: "row",
					marginBottom: 20,
				}}
			>
				{Slides?.map((_, index) => (
					<View
						style={[
							styles.indicator,
							currentId === index && styles.activeIndicator,
						]}
						key={index}
					/>
				))}
			</View>
			<View style={styles.buttonContainer}>
				{currentId !== Slides.length - 1 ? (
					<InActiveButton
						text={"Skip"}
						onPress={skip}
						width={115}
					/>
				) : null}
				<ActiveButton
					onPress={currentId !== Slides.length - 1 ? next : NavigateToApp}
					text={currentId !== Slides.length - 1 ? "Next" : "Get Started"}
					width={currentId !== Slides.length - 1 ? 115 : "100%"}
				/>
			</View>
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginTop: "auto",
		marginBottom:50
	},

	indicator: {
		backgroundColor: colors.primaryGrey,
		height: 8,
		width: 8,
		marginHorizontal: 3,
		borderRadius: 20,
	},
	activeIndicator: {
		backgroundColor: colors.primary,
		width: 14,
		height: 14,
	},
	footing: {
		alignItems: "center",
		justifyContent: "center",
		height: height * 0.2,
		width: width,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 40,
	},
});
