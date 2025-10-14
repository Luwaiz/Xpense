import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import * as Progress from "react-native-progress";
import ActiveButton from "../../components/ActiveButton";
import axios from "axios";
import { colors } from "../../hooks/Colours";
import API from "../../hooks/API";
import AuthStore from "../../hooks/ZustandStore";
import NoBudget from "../../assets/svg/BudgetIcon.svg";
import styles from "./Styles";
import addComma from "../../hooks/AmountFormat";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import CreateBudget from "../../components/CreateBudget";
import EditBudget from "../../components/EditBudget";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";


const Budget = ({ navigation }) => {
	// Sample budget data
	const [budgets, setBudgets] = useState([]);
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [error, setError] = useState(null);
	const [modal, setModal] = useState(false);
	const [longPress, setLongPress] = useState(null); // Track the selected budget
	const [updating, setUpdating] = useState({
		deleting: false,
		editing: false,
	});

	const token = AuthStore((state) => state.token);

	const formatDate = (isoString) => {
		const date = new Date(isoString);
		return date.toLocaleString("en-GB");
	};

	const getBudgets = async () => {
		setLoading(true);

		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(API.getBudgets, header);
			console.log(response.data);
			setBudgets(response.data);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	};

	// Function to schedule a local notification
	const schedulePushNotification = async (title, body) => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: title,
				body: body,
				data: { type: "budget_exceeded" }, // Optional: Add custom data
			},
			trigger: { seconds: 1 }, // Show the notification after 1 second
		});
	};

	// Function to check if any budget is exceeded
	const checkBudgets = (budgets) => {
		budgets.forEach((budget) => {
			if (budget.spent > budget.limit) {
				schedulePushNotification(
					"Budget Exceeded",
					`You have exceeded your budget for ${budget.name}!`
				);
			}
		});
	};

	useEffect(() => {
		if (budgets.length > 0) {
		  checkBudgets(budgets);
		}
	  }, [budgets]);

	const onRefresh = async () => {
		setRefresh(true);
		getBudgets();
		setRefresh(false);
	};
	useFocusEffect(
		useCallback(() => {
			getBudgets(); // Fetch recent expenses when the screen is focused
		}, [])
	);

	const ViewExpenses = async (BudgetId) => {
		if (BudgetId !== "") {
			navigation.navigate("List Expenses", {
				BudgetId: BudgetId,
			});
		}
	};

	const dropDown = (id) => {
		setLongPress((prev) => (prev === id ? null : id)); // Toggle edit mode
	};

	// Render each budget item
	const renderBudgetItem = ({ item }) => {
		if (item?.limit !== null && item?.spent !== null) {
			const progress = item?.spent / item?.limit;

			const deleteBudget = async (id) => {
				setUpdating((prevState) => ({ ...prevState, deleting: true }));
				const header = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				try {
					const budgetId = id;
					const response = await axios.delete(
						`${API.deleteBudget}/${budgetId}`,
						header
					);
					console.log("delete success", response.data);
					setLongPress(false);
					setBudgets((prevBudgets) =>
						prevBudgets.filter((b) => b._id !== budgetId)
					);

					setUpdating((prevState) => ({ ...prevState, deleting: false }));
				} catch (e) {
					console.log("error deleting", e.response.data);
					setUpdating((prevState) => ({ ...prevState, deleting: false }));
				}
			};

			const edit = (id) => {
				setLongPress(id);
				setEditMode(true);
			};
			return (
				<View>
					<TouchableOpacity
						style={styles.budgetItem}
						onPress={() => ViewExpenses(item?._id)} // Hide edit on normal tap
						onLongPress={() => dropDown(item?._id)}
					>
						<View style={styles.itemHeader}>
							<Text style={styles.category}>{item?.name}</Text>
							<Text style={styles.amount}>
								₦{addComma(item?.spent)} / ₦{addComma(item?.limit)}
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
						<View style={styles.bottomContainer}>
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
							<Text style={styles.date}>{formatDate(item?.createdAt)}</Text>
						</View>
					</TouchableOpacity>

					{/* Show Edit Button Only for the Long-Pressed Item */}
					{longPress === item._id && (
						<View style={styles.editContainer}>
							{updating.deleting === true ? (
								<ActivityIndicator />
							) : (
								<TouchableOpacity onPress={() => deleteBudget(item._id)}>
									<AntDesign name="delete" size={24} color="black" />
								</TouchableOpacity>
							)}
							<TouchableOpacity onPress={() => edit(item._id)}>
								<Feather name="edit" size={24} color="black" />
							</TouchableOpacity>
						</View>
					)}
				</View>
			);
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Text style={styles.header}>Budget Overview</Text>
				{longPress && <Text onPress={() => dropDown()}>close</Text>}
			</View>
			{loading && (
				<ActivityIndicator
					size={30}
					color={colors.primary}
					style={styles.ActivityIndicator}
				/>
			)}
			{budgets.length > 0 ? (
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
			) : (
				loading === false &&
				budgets?.length === 0 && (
					<View style={styles.noBudgetCont}>
						<Text style={styles.noBudgetText}>No existing Budget.</Text>
						<NoBudget width={200} height={200} />
					</View>
				)
			)}
			<ActiveButton text="Add Budget" onPress={() => setModal(true)} />
			{modal && <CreateBudget modal={modal} setModal={setModal} />}
			{editMode && (
				<EditBudget
					modal={editMode}
					setModal={setEditMode}
					id={longPress}
					setLongPress={setLongPress}
				/>
			)}
		</View>
	);
};

export default Budget;
