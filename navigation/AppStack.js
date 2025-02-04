import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";

const Stack = createNativeStackNavigator();
const AppStack = () => {
	return (
		<Stack.Navigator screenOptions={{headerShown:false}}>
			<Stack.Screen name="HomePage" component={BottomTab} />
		</Stack.Navigator>
	);
};

export default AppStack;
