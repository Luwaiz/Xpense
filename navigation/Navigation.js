import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "../screens/Onboarding";
import AuthOption from "../screens/AuthOption";
const Stack = createNativeStackNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen component={Onboarding} name="OnBoard" />
				<Stack.Screen component={AuthOption} name="AuthOption" />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
