import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextComponent,
	View,
} from "react-native";
import React, { useState } from "react";
import styles from "./Styles";
import TransactionBox from "../../components/TransactionBox";
import GraphChart from "../../components/GraphChart";
import YearBar from "../../components/YearBar";
import { colors } from "../../hooks/Colours";

const Transactions = () => {
	const [selected, setSelected] = useState("Transactions");
	const data = [
		{
			amount: 200,
			item: "Netflix",
			date: "12/05/2022",
			category: "Electronics",
		},
		{
			amount: 500,
			item: "Groceries",
			date: "11/05/2022",
			category: "Groceries",
		},
		{
			amount: 300,
			item: "Salary",
			date: "10/05/2022",
			category: "Salary",
		},
		{
			amount: 150,
			item: "Petrol",
			date: "09/05/2022",
			category: "Fuel",
		},
		{
			amount: 400,
			item: "Books",
			date: "08/05/2022",
			category: "Books",
		},
		{
			amount: 700,
			item: "Transportation",
			date: "07/05/2022",
			category: "Transportation",
		},
		{
			amount: 250,
			item: "Health Insurance",
			date: "06/05/2022",
			category: "Health Insurance",
		},
		{
			amount: 900,
			item: "Travel",
			date: "05/05/2022",
			category: "Travel",
		},
		{
			amount: 600,
			item: "Gifts",
			date: "04/05/2022",
			category: "Gifts",
		},
		{
			amount: 800,
			item: "Miscellaneous",
			date: "03/05/2022",
			category: "Miscellaneous",
		},
		{
			amount: 1200,
			item: "Emergency Fund",
			date: "02/05/2022",
			category: "Emergency Fund",
		},
	];
	return (
		<View style={styles.container}>
			<YearBar />
			<View style={styles.barContainer}>
				<GraphChart />
				<View style={styles.section}>
					<Pressable onPress={() => setSelected("Transactions")} >
						<Text
							style={[
								styles.sectionText,
								{
									color:
										selected === "Transactions"
											? colors.primary
											: colors.greyText,
								},
							]}
						>
							Transactions
						</Text>
					</Pressable>
					<Pressable onPress={() => setSelected("Categories")}>
						<Text
							style={[
								styles.sectionText,
								{
									color:
										selected === "Categories"
											? colors.primary
											: colors.greyText,
								},
							]}
						>
							Categories
						</Text>
					</Pressable>
				</View>
				<View style={styles.underline}>
					<View style={styles.activeLine} />
				</View>
			</View>
			<Text style={styles.recent}>Recent Transactions</Text>
			<FlatList
				style={styles.scroll}
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => <TransactionBox item={item} />}
			/>
		</View>
	);
};

export default Transactions;
