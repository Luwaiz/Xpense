import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ActiveButton from "../components/ActiveButton";
import InActiveButton from "../components/InActiveButton";
import { colors } from "../hooks/Colours";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Xpense from "../assets/svg/XpenseLogo.svg";

const AuthScreen = ({ navigation }) => {
	const ToLogin = () => {
		navigation.navigate("Login");
	};
	const ToSignup = () => {
		navigation.navigate("Signup");
	};
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Xpense />
			</View>
			<BottomSheet
				backgroundStyle={{ borderRadius: 50 }}
				handleComponent={null}
				snapPoints={["30%"]}
			>
				<BottomSheetView style={styles.sheet}>
					<Text style={styles.welcome}>Welcome!</Text>
					<ActiveButton text={"Sign up"} onPress={ToSignup} width={200} />
					<InActiveButton text={"Log in"} onPress={ToLogin} width={200} />
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
};

export default AuthScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		alignItems: "center",
	},
	topContainer: {
		flex: 0.6,
		backgroundColor: colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	sheet: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 30,
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	welcome: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 20,
		textAlign: "center",
	},
});
