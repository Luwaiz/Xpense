import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "../screens/onboarding/Onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "./AuthStack";
const Stack = createNativeStackNavigator();

export default function Navigation() {
	const [firstLaunch, setFirstLaunch] = useState(null);

	const OnBoardState = async () => {
		try {
			const isFirstLaunch = await AsyncStorage.getItem("firstLaunch");
			if (isFirstLaunch === null) {
				await AsyncStorage.setItem("firstLaunch", "true");
				setFirstLaunch(true);
				console.log("First launch");
			} else {
				setFirstLaunch(false);
				console.log("Not first launch");
			}
		} catch (err) {
			console.log("Error on getting first launch state", err);
		}
	};

	useEffect(() => {
		OnBoardState();
	}, []);
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{firstLaunch && <Stack.Screen component={Onboarding} name="OnBoard" />}
				<Stack.Screen component={AuthStack} name="AuthStack" />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
