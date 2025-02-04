import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../screens/home/HomePage";
import Budget from "../screens/budgets/Budget";
import Transactions from "../screens/transactions/Transactions";
import Profile from "../screens/profile/Profile";
import TabHeader from "../components/TabHeader";

const Tab = createBottomTabNavigator();
const BottomTab = () => {
	return (
		<Tab.Navigator screenOptions={{header:({route})=><TabHeader route={route}/>}}>
			<Tab.Screen name="Home" component={HomePage} />
			<Tab.Screen name="Budget" component={Budget} />
			<Tab.Screen name="Transactions" component={Transactions} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
};

export default BottomTab;
