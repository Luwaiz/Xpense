import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import GraphChart from "../../components/GraphChart";
import AuthStore from "../../hooks/ZustandStore";
import axios from "axios";
import API from "../../hooks/API";
import YearBar from "../../components/YearBar";
import ExpenseCard from "../../components/ExpenseCard";

const ViewChart = ({}) => {
	const [loading, setLoading] = useState("");
	const [option, setOption] = useState("Weekly");
	const [weekBarChart, setWeekBarChart] = useState([]);
	const [monthBarChart, setMonthBarChart] = useState([]);
	const [error, setError] = useState(null);

	const token = AuthStore((state) => state.token);

	const weeklyExpenses = async () => {
		setLoading(true);
		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(API.weeklyExpenses, header);
      console.log("weeeeee",response.data)
			setWeekBarChart(response.data.weeklyData);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const monthlyExpenses = async () => {
		setLoading(true);
		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(API.monthlyExpenses, header);
			setMonthBarChart(response.data.yearlyData);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		weeklyExpenses();

		monthlyExpenses();
	}, []);

	return (
		<ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
			<YearBar sector={"Weekly"} />
      <Text style={styles.heading}>
          This Week's Expenses
      </Text>
			<GraphChart Data={weekBarChart} option={"Weekly"} />
      <ExpenseCard/>
			<YearBar sector={"Monthly"} />
      <Text style={styles.heading}>
        This Month's Expenses
      </Text>
			<GraphChart Data={monthBarChart} option={"Monthly"} />
      <ExpenseCard/>

		</ScrollView>
	);
};

export default ViewChart;
