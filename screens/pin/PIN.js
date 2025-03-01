import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import styles from "./Styles";
import { SafeAreaView } from "react-native-safe-area-context";

const PIN = ({ navigation }) => {
	const NavigateHome = () => {};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>Let's setup your pin.</Text>
			{/* <TextInput style={styles.input} keyboardType="number-pad" /> */}
		</SafeAreaView>
	);
};

export default PIN;
