import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Header";
import styles from "./Styles";
import { colors } from "../../hooks/Colours";
import ActiveButton from "../../components/ActiveButton";

const OTPVerification = ({navigation}) => {
	const NavigateSetPin = () => {
		navigation.navigate("SuccessPin");
	};
	return (
		<View style={styles.container}>
			{/* <Header title={"Verification"} /> */}
			<View style={styles.bottomContainer}>
				<Text style={styles.heading}>Enter your 6-digit OTP</Text>
				<View style={styles.otpInput}>
				</View>
				<Text style={styles.itemText}>
					We sent verification code to your email{" "}
					<Text style={{ color: colors.primary }}>
						brajaoma*****@gmail.com.
					</Text>{" "}
					You can check your inbox.
				</Text>

				<Text style={styles.resendOtp}>
					I didn't receive the code. Resend OTP
				</Text>

				<View style={styles.button}>
					<ActiveButton text={"Verify"} onPress={() => NavigateSetPin()} />
				</View>
			</View>
		</View>
	);
};

export default OTPVerification;
