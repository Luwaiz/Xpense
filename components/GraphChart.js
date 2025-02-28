import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "../hooks/Colours";
const { width, height } = Dimensions.get("window");
const GraphChart = ({ Data, option }) => {
	const today = new Date();
	const dayName = today
		.toLocaleDateString("en-US", { weekday: "long" })
		.slice(0, 3); // "Mon"
	const monthName = today.toLocaleDateString("en-US", { month: "short" }); // "Feb"

	const initialSelect = option === "Weekly" ? dayName : monthName; // Decide based on option

	const [selected, setSelected] = useState({
		label: initialSelect,
		fullData: Data.filter((data) =>
			option === "Weekly"
				? data?.day?.slice(0, 3) === initialSelect
				: data?.month?.slice(0, 3) === initialSelect
		),
	});

	// Compute barData dynamically based on selection
	const barData = Data.map((data) => {
		const label =
			option === "Weekly" ? data?.day?.slice(0, 3) : data?.month?.slice(0, 3);
		return {
			value: data.amount,
			label: label,
			frontColor:
				selected.label === label ? colors.primary : colors.primaryGrey, // Change color when selected
		};
	});

	const modifiedBarData = barData.map((item) => ({
		...item,
		value: item.value === 0 ? 100 : item?.value, // Set a minimum height
	}));

	useEffect(() => {
		console.log("fulldata", selected);
	}, [selected]);

	return (
		<ScrollView horizontal contentContainerStyle={{ padding: 0 }}>
			<View style={styles.container}>
				<BarChart
					barWidth={30}
					barBorderRadius={5}
					frontColor={colors.primaryGrey}
					data={modifiedBarData}
					yAxisThickness={0}
					xAxisThickness={0}
					dashWidth={0}
					yAxisTextStyle={{ display: "none" }}
					onPress={(item, index) => {
						const filteredData = Data.filter((data) =>
							option === "Weekly"
								? data?.day?.slice(0, 3) === item.label
								: data?.month?.slice(0, 3) === item.label
						);
						setSelected({ label: item.label, fullData: filteredData });
					}} // Store both					initialSpacing={0}
					yAxisLabelContainerStyle={{ width: 0 }}
					yAxisTextNumberOfLines={0}
					yAxisLabelWidth={0}
					endSpacing={0}
					spacing={option === "Weekly" ? 15 : 5}
				/>
			</View>
		</ScrollView>
	);
};

export default GraphChart;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
	},
	text: {
		fontSize: 16,
		color: colors.primaryGrey,
		marginTop: 10,
		marginBottom: 10,
		fontWeight: "bold",
	},
});
