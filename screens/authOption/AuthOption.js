import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ActiveButton from "../../components/ActiveButton";
import InActiveButton from "../../components/InActiveButton";
import { colors } from "../../hooks/Colours";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Xpense from "../../assets/svg/XpenseLogo.svg";
import styles from "./Styles";

const AuthOption = ({ navigation }) => {
	// function	to navigate to login page
	const ToLogin = () => {
		navigation.navigate("Login");
	};

	// function to navigate to signup page
	const ToSignup = () => {
		navigation.navigate("SignUp");
	};
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
			<Image
					source={require("../../assets/cardImage.png")}
					style={styles.Image}
				/>
				<Xpense />
			</View>

			{/* bottom sheet containing the buttons */}
			<BottomSheet
				backgroundStyle={{ borderRadius: 50 }}
				handleComponent={null}
				snapPoints={["40%"]}
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

export default AuthOption;
