import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import Expense from "../screens/expense/Expense";
import Header from "../components/Header";
import Income from "../screens/income/Income";
import AllTransactions from "../screens/allTransactions/AllTransactions";
import ListExpenses from "../screens/listExpenses/ListExpenses";
import ExpenseDetails from "../screens/expenseDetails/ExpenseDetails";
import ViewChart from "../screens/viewChart/ViewChart";
import Privacy from "../screens/privacy/Privacy";
import EditAccount from "../screens/editAccount/EditAccount";
import About from "../screens/about/About";

const Stack = createNativeStackNavigator();
const AppStack = () => {
	
	return (
		<Stack.Navigator
			screenOptions={{ header: ({ route }) => <Header title={route.name} /> }}
		>
			<Stack.Screen
				name="HomePage"
				component={BottomTab}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="Expense" component={Expense} />
			<Stack.Screen name="Budgets" component={Income} />
			<Stack.Screen name="AllTransactions" component={AllTransactions} />
			<Stack.Screen name="List Expenses" component={ListExpenses} />
			<Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />
			<Stack.Screen name="Chart" component={ViewChart} />
			<Stack.Screen
				name="Privacy Policy"
				component={Privacy}
				options={{ animation: "slide_from_right" }}
			/>
			<Stack.Screen
				name="My Account"
				component={EditAccount}
				options={{ animation: "slide_from_right" }}
			/>
			<Stack.Screen
				name="About App"
				component={About}
				options={{ animation: "slide_from_right" }}
			/>
		</Stack.Navigator>
	);
};

export default AppStack;
