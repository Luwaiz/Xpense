import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ActiveButton from "../../components/ActiveButton";
import InActiveButton from "../../components/InActiveButton";
import { colors } from "../../hooks/Colours";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Xpense from "../../assets/svg/XpenseLogo.svg";
import styles from "./Styles";

const AuthOption = ({ navigation }) => {
	const ToLogin = () => {
		navigation.navigate("Login");
	};
	const ToSignup = () => {
		navigation.navigate("SignUp");
	};
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Xpense />
			</View>
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

