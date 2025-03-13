import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import styles from "./Styles";
import Xpense from "../../assets/svg/XpenseLogo.svg";
import { colors } from "../../hooks/Colours";
import ActiveButton from "../../components/ActiveButton";
import OTPBox from "../../components/OTPBox";
import AuthStore from "../../hooks/ZustandStore";
import axios from "axios";
import API from "../../hooks/API";
import AddSuccessModal from "../../components/AddSucceessModal";
import UserProfileHook from "../../hooks/UserProfileHook";

const OTPVerification = ({ navigation }) => {
	const email = AuthStore((state) => state.email);
	const password = AuthStore((state) => state.password);
	const name = AuthStore((state) => state.name);
	const setToken = AuthStore((state) => state.setToken);

	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);

	const maskEmail = (email) => {
		const [localPart, domain] = email.split("@");
		if (!localPart || !domain) return email; // Return as is if email is invalid

		const visibleChars = Math.min(3, localPart.length); // Show at least 3 characters
		const maskedChars = "*".repeat(localPart.length - visibleChars); // Mask remaining characters

		return `${localPart.slice(0, visibleChars)}${maskedChars}@${domain}.`;
	};

	const OTPVerification = async (otp) => {
		if (otp) {
			setLoading(true);
			const request = {
				email: email,
				otp: otp,
			};
			try {
				const response = await axios.post(API.verifyOtp, request);
				console.log(response.data);
				SignUp();
			} catch (e) {
				console.log("Error sending OTP", e.response.data);
				setLoading(false);
			}
		}
	};
	const NavigateSetPin = () => {
		navigation.navigate("SuccessPin");
	};

	const SignUp = async () => {
		const request = {
			name: name,
			email: email,
			password: password,
		};

		try {
			const response = await axios.post(API.Register, request);
			console.log(response.data);
			setModal(true)
			
			NextPage(response.data.token);
		} catch (e) {
			console.log("Error signing up", e.response.data);
			setLoading(false);
		}
	};

	const NextPage = async (token) => {
		if(modal === false){
			setToken(token)
			await UserProfileHook();
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.TopContainer}>
				<Xpense />
			</View>
			{/* <Header title={"Verification"} /> */}
			<View style={styles.bottomContainer}>
				<Text style={styles.heading}>Enter your 6-digit code</Text>
				<Text style={styles.Text}>
					Enter the Verification code sent to your email,{" "}
					<Text style={{ color: colors.primary, fontWeight: "700" }}>
						{maskEmail(email)}
					</Text>
				</Text>
				<View style={styles.otpInput}>
					<OTPBox length={6} onComplete={(otp) => OTPVerification(otp)} />
				</View>
				<View style={styles.bottomText}>
					<Text style={styles.resendOtp}>
						Didn't receive the code.
						<Text style={{ color: colors.primary, fontWeight: "700" }}>
							Resend
						</Text>
					</Text>
					<Text>2:00s</Text>
				</View>

				<View style={styles.button}>
					<ActiveButton
						text={"Verify"}
						onPress={() => NavigateSetPin()}
						loading={loading}
						
					/>
				</View>
			</View>
			{modal && (
				<AddSuccessModal
					text={"TEmail was verified Successfully"}
					modal={modal}
					setModal={setModal}
					NextPage={NextPage()}
				/>
			)}
		</View>
	);
};

export default OTPVerification;
