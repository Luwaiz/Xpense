import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import styles from "./Styles";
import GraphChart from "../../components/GraphChart";
import AuthStore from "../../hooks/ZustandStore";
import YearBar from "../../components/YearBar";
import ExpenseCard from "../../components/ExpenseCard";

const ViewChart = () => {
	const [selectedExpenses, setSelectedExpenses] = useState([]);
	const weekBarChart = AuthStore((state) => state.weeklyData);

	return (
		<ScrollView
			contentContainerStyle={styles.contentContainer}
			style={styles.container}
		>
			<YearBar sector={"Weekly"} />
			<Text style={styles.heading}>This Week's Expenses</Text>

			<GraphChart
				Data={weekBarChart}
				option={"Weekly"}
				setSelection={setSelectedExpenses}
			/>

			{selectedExpenses?.expenses?.length > 0 ? (
				<ExpenseCard item={selectedExpenses} />
			) : (
				<Text style={styles.noDataText}>Tap a bar to view details</Text>
			)}
		</ScrollView>
	);
};

export default ViewChart;
