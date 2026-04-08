import {
	View,
	Text,
	ScrollView,
	StatusBar,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import { registerForPushNotificationsAsync } from "../../hooks/ReactNotification";

const HomePage = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [modal, setModal] = useState(false);
	const token = AuthStore((state) => state.token);
	const data = AuthStore((state) => state.recentExpenses);
	const setData = AuthStore((state) => state.setRecentExpenses);

	const intervalRef = useRef(null);

	const getRecent = async (silent = false) => {
		if (!silent) setLoading(true);
		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(API.getRecentExpenses, header);
			setData(response.data);
		} catch (e) {
			console.log("error", e);
		} finally {
			if (!silent) setLoading(false);
		}
	};

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => {
			if (token) {
				console.log("📲 Push Token Received:", token);
			} else {
				console.warn("⚠️ No push token received!");
			}
		});
	}, []);

	useEffect(() => {
		getRecent(data.length > 0);
		intervalRef.current = setInterval(() => getRecent(true), 30000);
		return () => clearInterval(intervalRef.current);
	}, []);

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
			<ScrollView
				style={styles.scroll}
				contentContainerStyle={styles.ContentContainer}
				showsVerticalScrollIndicator={false}
			>
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
			</ScrollView>
			{modal && <CreateBudget modal={modal} setModal={setModal} />}
		</View>
	);
};

export default HomePage;
