import { View, Text, Dimensions, Platform } from "react-native";
import React from "react";
import styles from "./Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Check from "../../assets/svg/success";
import ActiveButton from "../../components/ActiveButton";
const { width, height } = Dimensions.get("window");

const SuccessPin = ({ navigation }) => {
	const navigateToHome = () => {
		navigation.navigate("AppStack", {
			screen: "HomePage",
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.check}>
				<Check />
				<Text style={styles.text}>You're all set!</Text>
			</View>
			<View style={styles.button}>
				<ActiveButton
					text={"Let's go"}
					width={width - 32}
					onPress={() => navigateToHome()}
				/>
			</View>
		</SafeAreaView>
	);
};

export default SuccessPin;
