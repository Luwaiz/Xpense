import {
	View,
	Text,
	ScrollView,
	FlatList,
	StatusBar,
	TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Styles";
import ATMCard from "../../components/ATMCard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TransactionList from "../../components/TransactionList";
import axios from "axios";
import API from "../../hooks/API";
import AuthStore from "../../hooks/ZustandStore";
import { colors } from "../../hooks/Colours";
import TransactionBox from "../../components/TransactionBox";
import NoExpense from "../../assets/svg/NoExpense.svg";
import CreateBudget from "../../components/CreateBudget";
import { useFocusEffect } from "@react-navigation/native";

const HomePage = ({ navigation }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [modal, setModal] = useState(false);
	const token = AuthStore((state) => state.token);

	const getRecent = async () => {
		setLoading(true);
		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(API.getRecentExpenses, header);
			setData(response.data);
			setLoading(false);
		} catch (e) {
			console.log("error", e);
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getRecent(); // Fetch recent expenses when the screen is focused
		}, [])
	);

	const createBudget = () => {
		setModal(true);
	};
	const Expense = () => {
		navigation.navigate("Expense");
	};
	const Income = () => {
		navigation.navigate("Budgets");
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle={"dark-content"} />
			<ATMCard />
			<View style={styles.options}>
				<TouchableOpacity
					onPress={() => Expense()}
					style={styles.optionContainer}
				>
					<View style={[styles.icon, { backgroundColor: colors.primary }]}>
						<FontAwesome5 name="wallet" size={20} color="white" />
					</View>
					<Text style={styles.iconText}>Add Expense</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => createBudget()}
					style={styles.optionContainer}
				>
					<View style={[styles.icon, { backgroundColor: "green" }]}>
						<MaterialCommunityIcons name="piggy-bank" size={24} color="white" />
					</View>
					<Text style={styles.iconText}>Create Budget</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.recentText}>Recent Expenses</Text>
			<View style={styles.bottom}>
				{data.length > 0 ? (
					data?.map((expenses, index) => (
						<TransactionBox key={index?.toString()} item={expenses} />
					))
				) : (
					<View style={styles.noExpenseCont}>
						<Text style={styles.noExpenseText}>No Expenses Incurred.</Text>
						<View style={styles.overlay}>
							<NoExpense width={200} height={200} />
						</View>
					</View>
				)}
			</View>
			{modal && <CreateBudget modal={modal} setModal={setModal} />}
		</View>
	);
};

export default HomePage;
