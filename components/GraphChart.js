import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "../hooks/Colours";
const { width, height } = Dimensions.get("window");
const GraphChart = () => {
	const [select, setSelect] = useState("Tue");
	const barData = [
		{
			value: 300,
			label: "Sun",
			frontColor: select === "Sun" ? colors.primary : colors.primaryGrey,
		},
		{
			value: 250,
			label: "Mon",
			frontColor: select === "Mon" ? colors.primary : colors.primaryGrey,
		},
		{
			value: 500,
			label: "Tue",
			frontColor: select === "Tue" ? colors.primary : colors.primaryGrey,
		},
		{
			value: 875,
			label: "Wed",
			frontColor: select === "Wed" ? colors.primary : colors.primaryGrey,
		},
		{
			value: 320,
			label: "Thu",
			frontColor: select === "Thu" ? colors.primary : colors.primaryGrey,
		},
		{
			value: 700,
			label: "Fri",
			frontColor: select === "Fri" ? colors.primary : colors.primaryGrey,
		},
		{
			value: 256,
			label: "Sat",
			frontColor: select === "Sat" ? colors.primary : colors.primaryGrey,
		},
	];

	return (
		<View style={styles.container}>
			<BarChart
				barWidth={32}
				barBorderRadius={5}
				frontColor={colors.primaryGrey}
				data={barData}
				yAxisThickness={0}
				xAxisThickness={0}
				dashWidth={0}
				yAxisTextStyle={{ display: "none" }}
				onPress={(item, index) => setSelect(item.label)}
				initialSpacing={0}
				yAxisLabelContainerStyle={{ width: 0 }}
				yAxisTextNumberOfLines={0}
				yAxisLabelWidth={0}
				endSpacing={0}
				spacing={15}
			/>
		</View>
	);
};

export default GraphChart;

const styles = StyleSheet.create({
	container: {
		paddingLeft: 20,
	},
	text: {
		fontSize: 16,
		color: colors.primaryGrey,
		marginTop: 10,
		marginBottom: 10,
		fontWeight: "bold",
	},
});
