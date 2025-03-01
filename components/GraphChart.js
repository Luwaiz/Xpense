import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "../hooks/Colours";

const { width, height } = Dimensions.get("window");

const GraphChart = ({ Data, option, setSelection }) => {
	const today = new Date();
	const dayName = today
		.toLocaleDateString("en-US", { weekday: "long" })
		.slice(0, 3); // "Mon"

	const [selected, setSelected] = useState({
		label: dayName,
		...Data.find((data) => data.day.slice(0, 3) === dayName) || {},
	});

	// ✅ Use useMemo to ensure `barData` updates correctly when `selected` changes
	const barData = useMemo(() => {
		return (Data || []).map((data) => {
			const label = data.day ? data.day.slice(0, 3) : "N/A"; // Safe fallback
			return {
				value: data.totalAmount || 0,
				label: label,
				frontColor: selected.label === label ? colors.primary : colors.primaryGrey, // ✅ Dynamically updates color
			};
		});
	}, [Data, selected]);

	// Update parent component when selection changes
	useEffect(() => {
		setSelection(selected);
	}, [selected]);

	return (
		<ScrollView horizontal contentContainerStyle={{ padding: 0 }}>
			<View style={styles.container}>
				<BarChart
					barWidth={30}
					barBorderRadius={5}
					frontColor={colors.primaryGrey}
					data={barData} // ✅ Now correctly updates
					yAxisThickness={0}
					xAxisThickness={0}
					dashWidth={0}
					yAxisTextStyle={{ display: "none" }}
					onPress={(item) => {
						const filteredData = Data.find(
							(data) => data.day.slice(0, 3) === item.label
						);
						if (filteredData) {
							setSelected({
								...filteredData, // ✅ Preserve all data fields
								label: item.label, // ✅ Ensure label updates correctly
							});
						}
					}}
					initialSpacing={0}
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
