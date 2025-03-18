import {
	Image,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../hooks/Colours";
import { SafeAreaView } from "react-native-safe-area-context";
import Xpense from "../../assets/svg/XpenseLogo2.svg";
import InputContainer from "../../components/InputContainer";
import ActiveButton from "../../components/ActiveButton";
import styles from "./Styles";
import axios from "axios";
import API from "../../hooks/API";
import AuthStore from "../../hooks/ZustandStore";
import UserProfileHook from "../../hooks/UserProfileHook";

const LogIn = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const setToken = AuthStore((state) => state.setToken);

	const NavigateToSignUp = () => {
		navigation.navigate("SignUp");
	};
	const navigateToHome = () => {
		navigation.navigate("AppStack", {
			screen: "HomePage",
			params: {
				screen: "Home",
			},
		});
	};

	const handleLogin = async () => {
		if (email === "" || password === "") {
			setError("All fields are required");
			return;
		} else {
			setLoading(true);
			const request = {
				email: email.trim(),
				password: password.trim(),
			};

			try {
				const response = await axios.post(API.Login, request);
				console.log(response.data);
				setToken(response.data.token);
				await UserProfileHook();
				setLoading(false);
			} catch (e) {
				console.log("error", e.response.data.error);
				setError(e.response.data.error);
				setLoading(false);
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle={"light-content"} />

			<View style={styles.TopContainer}>
				<Image
					source={require("../../assets/images/cardImage.png")}
					style={styles.Image}
				/>
				<View style={styles.logo}>
					<Xpense width={100} height={100} />
				</View>
			</View>
			<View style={styles.bottomContainer}>
				<Text style={styles.SignUp}>Log in</Text>
				<ScrollView showsVerticalScrollIndicator={false}>
					<InputContainer
						text={"Email"}
						placeholder={"example@gmail.com"}
						onChangeText={(text) => setEmail(text)}
					/>
					<InputContainer
						text={"Password"}
						password
						placeholder={"********"}
						onChangeText={(text) => setPassword(text)}
						submit={() => handleLogin()}
					/>
					{error && <Text style={styles.error}>{error}</Text>}
					<View>
						<Text style={{ marginTop: 10 }}>
							Don't have an account?
							<Text
								style={{ color: colors?.primary, fontWeight: "bold" }}
								onPress={() => NavigateToSignUp()}
							>
								{" "}
								Sign Up
							</Text>
						</Text>
						<View style={styles.button}>
							<ActiveButton
								text={"Log in"}
								onPress={() => handleLogin()}
								disabled={loading}
								loading={loading}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default LogIn;
