import { Dimensions, StyleSheet, View } from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "../hooks/Colours";

const { width } = Dimensions.get("window");

const GraphChart = ({ Data, option, setSelection }) => {
	const [selectedLabel, setSelectedLabel] = useState(null);

	// Default selection to today's entry when data first loads
	useEffect(() => {
		if (!Data || Data.length === 0) return;
		const today = new Date()
			.toLocaleDateString("en-US", { weekday: "long" })
			.slice(0, 3);
		const todayEntry = Data.find((d) => d.day?.slice(0, 3) === today);
		const defaultEntry = todayEntry || Data[Data.length - 1];
		if (defaultEntry) {
			const label = defaultEntry.day.slice(0, 3);
			setSelectedLabel(label);
			setSelection({ ...defaultEntry, label });
		}
	}, [Data]);

	const barData = useMemo(() => {
		return (Data || []).map((data) => {
			const label = data.day ? data.day.slice(0, 3) : "N/A";
			return {
				value: data.totalAmount || 0,
				label,
				frontColor: selectedLabel === label ? colors.primary : colors.primaryGrey,
			};
		});
	}, [Data, selectedLabel]);

	const onPress = useCallback((item) => {
		const match = Data.find((d) => d.day?.slice(0, 3) === item.label);
		if (match) {
			setSelectedLabel(item.label);
			setSelection({ ...match, label: item.label });
		}
	}, [Data, setSelection]);

	return (
		<View style={styles.container}>
			<BarChart
				barWidth={30}
				barBorderRadius={5}
				frontColor={colors.primaryGrey}
				data={barData}
				yAxisThickness={0}
				xAxisThickness={0}
				dashWidth={0}
				hideYAxisText
				onPress={onPress}
				initialSpacing={10}
				endSpacing={10}
				spacing={option === "Weekly" ? 15 : 5}
				width={width - 60}
				noOfSections={4}
			/>
		</View>
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
