import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/signup/SignUp";
import AuthOption from "../screens/authOption/AuthOption";
import LogIn from "../screens/login/LogIn";
import OTPVerification from "../screens/otpVerification/OTPVerification";
import Header from "../components/Header";
import PIN from "../screens/pin/PIN";
import SuccessPin from "../screens/successPin/SuccessPin";
const Stack = createNativeStackNavigator();

// Authentication screens
const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="AuthOption" component={AuthOption} />
			<Stack.Screen name="SignUp" component={SignUp} />
			<Stack.Screen name="Login" component={LogIn} />
			<Stack.Screen
				name="Verification"
				component={OTPVerification}
				options={{
					headerShown: true,
					header: ({ route }) => <Header title={route.name} />,
				}}
			/>
			<Stack.Screen name="PIN" component={PIN} />
			<Stack.Screen name="SuccessPin" component={SuccessPin} />
			{/* <Stack.Screen name="Notify" component={Notify} /> */}
		</Stack.Navigator>
	);
};

export default AuthStack;
