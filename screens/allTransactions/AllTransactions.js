import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import TransactionList from "../../components/TransactionList";
import axios from "axios";
import API from "../../hooks/API";
import AuthStore from "../../hooks/ZustandStore";
import { colors } from "../../hooks/Colours";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./Styles";

const AllTransactions = ({ viewChart }) => {
	const [loading, setLoading] = useState("");
	const [refreshing, setRefreshing] = useState(false);
	const [transactions, setTransactions] = useState([]);
	const [error, setError] = useState(null);
	const token = AuthStore((state) => state.token);
	const date = new Date();
	const fullMonth = date.toLocaleDateString("en-US", { month: "long" });
	const year = date.getFullYear();

	const getExpense = async () => {
		setLoading(true);
		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(API.getExpense, header);
			setTransactions(response.data);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		getExpense();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.cont}>
					<Text style={styles.headerText}>
						{fullMonth} {year}
					</Text>
					<Ionicons name="calendar-outline" size={24} color="black" />
				</View>
				<View style={styles.cont}>
					<Text>Filter</Text>

					<Ionicons name="filter-outline" size={18} color="black" />
				</View>
			</View>
			<View style={styles.Buttons}>
				<TouchableOpacity style={styles.button} onPress={() => viewChart()}>
					<Text style={styles.buttonText}>View Chart</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Download</Text>
				</TouchableOpacity>
			</View>
			{loading && (
				<ActivityIndicator
					size={30}
					color={colors.primary}
					style={styles.ActivityIndicator}
				/>
			)}
			<TransactionList
				data={transactions}
				fetchData={getExpense}
				refreshing={refreshing}
			/>
		</View>
	);
};

export default AllTransactions;
