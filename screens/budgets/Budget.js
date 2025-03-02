import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	RefreshControl,
} from "react-native";
import * as Progress from "react-native-progress";
import ActiveButton from "../../components/ActiveButton";
import axios from "axios";
import { colors } from "../../hooks/Colours";
import API from "../../hooks/API";
import AuthStore from "../../hooks/ZustandStore";
import styles from "./Styles";
import addComma from "../../hooks/AmountFormat";

const Budget = ({ navigation }) => {
	// Sample budget data
	const [budgets, setBudgets] = useState([]);
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [error, setError] = useState(null);

	const token = AuthStore((state) => state.token);

	const getBudgets = async () => {
		setLoading(true);

		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(API.getBudgets, header);
			setBudgets(response.data);
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	const onRefresh = async () => {
		setRefresh(true);
		getBudgets();
		setRefresh(false);
	};
	useEffect(() => {
		getBudgets();
	}, []);

	const CreateBudget = () => {
		navigation.navigate("Budgets");
	};
	const ViewExpenses = async (BudgetId) => {
		if (BudgetId !== "") {
			navigation.navigate("List Expenses", {
				BudgetId: BudgetId,
			});
		}
	};

	// Render each budget item with a progress bar
	const renderBudgetItem = ({ item, index }) => {
		const progress = item?.spent / item?.limit;
		return (
			<TouchableOpacity
				style={styles.budgetItem}
				onPress={() => ViewExpenses(item?._id)}
			>
				<View style={styles.itemHeader}>
					<Text style={styles.category}>{item?.name}</Text>
					<Text style={styles.amount}>
						₦{addComma( item?.spent)} / ₦{ addComma (item?.limit)}
					</Text>
				</View>
				<Progress.Bar
					progress={progress}
					width={null}
					color={item?.spent > item?.limit ? "red" : "#4CAF50"}
					unfilledColor={colors.secondaryGrey}
					borderWidth={0}
					height={8}
					style={styles.progressBar}
				/>
				<Text
					style={[
						styles.limit,
						{ color: item?.spent > item?.limit ? "red" : "#4CAF50" },
					]}
				>
					{item?.spent > item?.limit
						? "Budget Exceeded !!!"
						: item?.spent === item?.limit
						? "Budget Reached !!!"
						: ""}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Budget Overview</Text>
			<FlatList
				data={budgets}
				keyExtractor={(item, index) => index.toString()}
				renderItem={(item, index) => renderBudgetItem(item, index)}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refresh}
						onRefresh={onRefresh ?? (() => {})}
					/>
				}
			/>
			<ActiveButton text="Add Budget" onPress={() => CreateBudget()} />
		</View>
	);
};

export default Budget;
