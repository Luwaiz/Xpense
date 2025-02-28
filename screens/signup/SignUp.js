import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../hooks/Colours";
import { SafeAreaView } from "react-native-safe-area-context";
import Xpense from "../../assets/svg/XpenseLogo2.svg";
import InputContainer from "../../components/InputContainer";
import ActiveButton from "../../components/ActiveButton";
import styles from "./Styles";
import axios from "axios";
import API from "../../hooks/API";

const SignUp = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [keyboardHeight, setKeyboardHeight] = useState(null);
	// function to navigate to login page
	const NavigateToLogin = () => {
		navigation.navigate("Login");
	};

	// function to navigate to OTP verification page

	const NavigateToVerify = () => {
		navigation.navigate("Verification");
	};

	// function to handle keyboard height change
	useEffect(() => {
		const showSubscription = Keyboard.addListener(
			"keyboardDidShow",
			handleKeyboardShow
		);
		const hideSubscription = Keyboard.addListener(
			"keyboardDidHide",
			handleKeyboardHide
		);
		return () => {
			showSubscription.remove();
		};
	}, []);

	const handleKeyboardShow = (event) => {
		setKeyboardHeight(-30);
	};
	const handleKeyboardHide = () => {
		setKeyboardHeight(null);
	};

	// function to validate user password
	const handleSignUpValidation = (password) => {
		if (password.length < 8) {
			console.log(password.trim().length);
			setError("Password must be at least 8 characters long");
			return false;
		} else if (password.trim() !== confirmPassword.trim()) {
			setError("Passwords do not match");
			return false;
		} else {
			setError("");
			return true;
		}
	};

	// function to handle user signup API calls
	const Register = async (password) => {
		if (
			email.trim() === "" ||
			password.trim() === "" ||
			confirmPassword.trim() === "" ||
			name.trim() === ""
		) {
			setError("All fields are required");
			return;
		} else if (handleSignUpValidation(password) === false) return;
		else {
			setError("");
			setLoading(true);

			const request = { 
				name: name.trim(),
				email: email.trim(),
				password: password.trim(),
			};
			try {
				const response = await axios.post(API.Register, request);
				console.log(response.data);
				setLoading(false);
				NavigateToVerify();
			} catch (e) {
				setError(e.response.data.message);
				console.log(e.response.data);
				setLoading(false);
			}
		}
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<View style={styles.TopContainer}>
					<Image
						source={require("../../assets/cardImage.png")}
						style={styles.Image}
					/>
					<View
						style={[
							styles.logo,
							keyboardHeight === -30 && { top: keyboardHeight },
						]}
					>
						<Xpense width={100} height={100} />
					</View>

					<Text style={styles.heading}>Get Started now</Text>
				</View>

				{/* custom bottom sheet to hold sign up fields */}
				<View style={styles.bottomContainer}>
					<Text style={styles.SignUp}>Sign up</Text>
					<ScrollView showsVerticalScrollIndicator={false}>
						<InputContainer
							onChangeText={(text) => setName(text)}
							text={"Name"}
							placeholder={"John Doe"}
						/>
						<InputContainer
							onChangeText={(text) => setEmail(text)}
							text={"Email"}
							placeholder={"example@gmail.com"}
						/>
						<InputContainer
							text={"Password"}
							password
							placeholder={"********"}
							onChangeText={(text) => setPassword(text)}
						/>
						<InputContainer
							text={"Confirm Password"}
							password
							placeholder={"********"}
							onChangeText={(text) => setConfirmPassword(text)}
						/>
						<Text style={styles.error}>{error}</Text>

						<View>
							<Text>
								Already have an account?
								<Text
									style={{ color: colors?.primary, fontWeight: "bold" }}
									onPress={() => NavigateToLogin()}
								>
									{" "}
									Login
								</Text>
							</Text>

							<View style={styles.button}>
								<ActiveButton
									text={"Sign up"}
									disabled={loading}
									onPress={() => Register(password)}
									loading={loading}
								/>
							</View>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default SignUp;
