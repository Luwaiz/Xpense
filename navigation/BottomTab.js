import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../screens/home/HomePage";
import Budget from "../screens/budgets/Budget";
import Transactions from "../screens/transactions/Transactions";
import Profile from "../screens/profile/Profile";
import TabHeader from "../components/TabHeader";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../hooks/Colours";

const Tab = createBottomTabNavigator();
const BottomTab = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				header: ({ route }) => <TabHeader route={route} />,
				tabBarStyle: styles.tabBarStyle,
				tabBarBadge:"2",
				tabBarHideOnKeyboard:true
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomePage}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<Foundation
								name="home"
								size={30}
								color={focused ? colors.primary : colors.primaryGrey}
							/>
						);
					},
					tabBarLabel: ({ focused, children }) => {
						return (
							<Text
								style={[
									styles.tabBarLabelText,
									{ color: focused ? colors.primary : colors.primaryGrey },
								]}
							>
								{children}
							</Text>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Budget"
				component={Budget}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<FontAwesome6
								name="wallet"
								size={23}
								color={focused ? colors.primary : colors.primaryGrey}
							/>
						);
					},
					tabBarLabel: ({ focused, children }) => {
						return (
							<Text
								style={[
									styles.tabBarLabelText,
									{ color: focused ? colors.primary : colors.primaryGrey },
								]}
							>
								{children}
							</Text>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Transactions"
				component={Transactions}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<FontAwesome
								name="pie-chart"
								size={24}
								color={focused ? colors.primary : colors.primaryGrey}
							/>
						);
					},
					tabBarLabel: ({ focused, children }) => {
						return (
							<Text
								style={[
									styles.tabBarLabelText,
									{ color: focused ? colors.primary : colors.primaryGrey },
								]}
							>
								{children}
							</Text>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<Ionicons
								name="person"
								size={24}
								color={focused ? colors.primary : colors.primaryGrey}
							/>
						);
					},
					tabBarLabel: ({ focused, children }) => {
						return (
							<Text
								style={[
									styles.tabBarLabelText,
									{ color: focused ? colors.primary : colors.primaryGrey },
								]}
							>
								{children}
							</Text>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTab;

const styles = StyleSheet.create({
	tabBarStyle: {
		minHeight: 60,
		paddingTop:5
	},
	tabBarLabelText: {
		fontSize: 12,
		fontWeight: "500",
		marginTop: 5,
		
	},


});
