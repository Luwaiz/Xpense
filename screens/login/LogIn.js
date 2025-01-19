import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../hooks/Colours";
import { SafeAreaView } from "react-native-safe-area-context";
import Xpense from "../../assets/svg/XpenseLogo2.svg";
import InputContainer from "../../components/InputContainer";
import ActiveButton from "../../components/ActiveButton";
import styles from "./Styles";

const LogIn = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.TopContainer}>
				<View style={styles.logo}>
					<Xpense width={100} height={100} />
				</View>
				<Text style={styles.heading}></Text>
				<Text style={styles.subheading}>Log in to access your account</Text>
			</View>
			<View style={styles.bottomContainer}>
				<Text style={styles.SignUp}>Log in</Text>

				<InputContainer text={"Email"} placeholder={"example@gmail.com"} />
				<InputContainer text={"Password"} password placeholder={"********"} />

				<View>
					<Text style={{ marginTop: 10 }}>
						Don't have an account?
						<Text
							style={{ color: colors?.primary, fontWeight: "bold" }}
							onPress={() => navigation.navigate("SignUp")}
						>
							{" "}
							Sign Up
						</Text>
					</Text>
					<View style={styles.button}>
						<ActiveButton text={"Log in"} />
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default LogIn;

