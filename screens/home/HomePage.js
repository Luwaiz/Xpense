import {
	View,
	Text,
	ScrollView,
	FlatList,
	StatusBar,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import ATMCard from "../../components/ATMCard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TransactionList from "../../components/TransactionList";
import axios from "axios";
import API from "../../hooks/API";
import AuthStore from "../../hooks/ZustandStore";
import { colors } from "../../hooks/Colours";

const HomePage = ({ navigation }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
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

	useEffect(() => {
		getRecent();
	}, []);
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
					onPress={() => Income()}
					style={styles.optionContainer}
				>
					<View style={[styles.icon, { backgroundColor: "green" }]}>
						<MaterialCommunityIcons name="piggy-bank" size={24} color="white" />
					</View>
					<Text style={styles.iconText}>Create Budget</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.recentText}>Recent Transactions</Text>
			<TransactionList  data={data || []} fetchData={getRecent} refreshing={refreshing}/>
		</View>
	);
};

export default HomePage;
