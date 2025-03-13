import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "../screens/onboarding/Onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import AuthStore from "../hooks/ZustandStore";
// import * as Notifications from "expo-notifications";

const Stack = createNativeStackNavigator();

export default function Navigation() {
	const token = AuthStore((state) => state.token);
	const [firstLaunch, setFirstLaunch] = useState(true);


	// const registerForPushNotificationsAsync = async () => {
	// 	let token;

	// 	const { status: existingStatus } =
	// 		await Notifications.getPermissionsAsync();
	// 	let finalStatus = existingStatus;

	// 	if (existingStatus !== "granted") {
	// 		const { status } = await Notifications.requestPermissionsAsync();
	// 		finalStatus = status;
	// 	}
	// 	if (finalStatus !== "granted") {
	// 		alert("Failed to get push token for push notification!");
	// 		return;
	// 	}
	// 	token = (await Notifications.getExpoPushTokenAsync()).data;
	// 	console.log(token);

	// 	return token;
	// };


	// checking the state of the application if launched for the first time or not

	// const OnBoardState = async () => {
	// 	try {
	// 		const isFirstLaunch = await AsyncStorage.getItem("firstLaunch");
	// 		if (isFirstLaunch === null) {
	// 			await AsyncStorage.setItem("firstLaunch", "true");
	// 			setFirstLaunch(true);
	// 			console.log("First launch");
	// 		} else {
	// 			setFirstLaunch(false);
	// 			console.log("Not first launch");
	// 		}
	// 	} catch (err) {
	// 		console.log("Error on getting first launch state", err);
	// 	}
	// };

	// useEffect(() => {
	// 	OnBoardState();
	// }, []);
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{/* conditionally rendering the Onboarding screen only on first launch */}

				{/* separation of Authentication screens and Application screens */}
				{token === "" ? (
					<>
						<Stack.Screen component={Onboarding} name="OnBoard" />

						<Stack.Screen component={AuthStack} name="AuthStack" />
					</>
				) : (
					<Stack.Screen component={AppStack} name="AppStack" />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
