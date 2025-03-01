import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import GraphChart from "../../components/GraphChart";
import AuthStore from "../../hooks/ZustandStore";
import axios from "axios";
import API from "../../hooks/API";
import YearBar from "../../components/YearBar";
import ExpenseCard from "../../components/ExpenseCard";

const ViewChart = () => {
	const [loading, setLoading] = useState(false);
	const [option, setOption] = useState("Weekly");
	const [weekBarChart, setWeekBarChart] = useState([]);
	const [selectedExpenses, setSelectedExpenses] = useState([]);
	const [error, setError] = useState(null);

	const token = AuthStore((state) => state.token);

	const weeklyExpenses = async () => {
		setLoading(true);
		const header = {
			headers: { Authorization: `Bearer ${token}` },
		};
		try {
			const response = await axios.get(API.weeklyExpenses, header);
			setWeekBarChart(response.data.weeklyData);
			setLoading(false);
		} catch (err) {
			console.error(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		weeklyExpenses();
	}, []);

	return (
		<ScrollView
			contentContainerStyle={styles.contentContainer}
			style={styles.container}
		>
			<YearBar sector={"Weekly"} />
			<Text style={styles.heading}>This Week's Expenses</Text>

			{/* Pass setSelectedExpenses so GraphChart can update ExpenseCard */}
			<GraphChart
				Data={weekBarChart}
				option={"Weekly"}
				setSelection={setSelectedExpenses}
			/>

			{/* Show list of selected expenses */}
			{selectedExpenses?.expenses?.length > 0 ? (
				<ExpenseCard item={selectedExpenses} />
			) : (
				<Text style={styles.noDataText}>Tap a bar to view details</Text>
			)}
		</ScrollView>
	);
};

export default ViewChart;
