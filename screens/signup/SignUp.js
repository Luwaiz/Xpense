import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../hooks/Colours";
import { SafeAreaView } from "react-native-safe-area-context";
import Xpense from "../../assets/svg/XpenseLogo2.svg";
import InputContainer from "../../components/InputContainer";
import ActiveButton from "../../components/ActiveButton";
import styles from "./Styles";

const SignUp = ({ navigation }) => {

	const NavigateToLogin = ()=>{
		navigation.navigate("Login")
	}	

	const OTPVerification = () => {
		navigation.navigate("OTP")
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.TopContainer}>
				<View style={styles.logo}>
					<Xpense width={100} height={100} />
				</View>
				<Text style={styles.heading}>Get Started now</Text>
				<Text style={styles.subheading}>
					Create a new account and start managing your finances
				</Text>
			</View>
			<View style={styles.bottomContainer}>
				<Text style={styles.SignUp}>Sign up</Text>
				<InputContainer text={"Name"} placeholder={"John Doe"} />
				<InputContainer text={"Email"} placeholder={"example@gmail.com"} />
				<InputContainer text={"Password"} password placeholder={"********"} />
				<InputContainer
					text={"Confirm Password"}
					password
					placeholder={"********"}
				/>

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
						<ActiveButton text={"Sign up"} onPress={()=>OTPVerification()} />
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SignUp;

