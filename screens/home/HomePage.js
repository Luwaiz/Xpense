import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import styles from "./Styles";
import ATMCard from "../../components/ATMCard";
import TransactionBox from "../../components/TransactionBox";

const HomePage = () => {
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
		}
	];
	
	return (
		<View style={styles.container}>
			<ATMCard />
			<View style={styles.options}></View>
			<View style={styles.balance}></View>
			<Text style={styles.recentText}>Recent Transactions</Text>
			<FlatList
				data={data || []}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => <TransactionBox item={item}/>}
				style={styles.scroll}
				contentContainerStyle={styles.scrollContainer}
				
			/>

		</View>
	);
};

export default HomePage;
