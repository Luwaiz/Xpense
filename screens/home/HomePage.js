import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "./Styles";
import ATMCard from "../../components/ATMCard";

const HomePage = () => {
	return (
		<View style={styles.container}>
				<ATMCard />
			<ScrollView style={styles.scroll}>
				<Text>HomePage</Text>
			</ScrollView>
		</View>
	);
};

export default HomePage;
