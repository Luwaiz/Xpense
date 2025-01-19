import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/signup/SignUp";
import AuthOption from "../screens/authOption/AuthOption";
import LogIn from "../screens/login/LogIn";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="AuthOption" component={AuthOption} />
			<Stack.Screen name="SignUp" component={SignUp} />
			<Stack.Screen name="Login" component={LogIn} />
		</Stack.Navigator>
	);
};

export default AuthStack;
