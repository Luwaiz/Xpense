import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styles from "./Styles";

const About = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				<Text style={styles.text3}>Xpense</Text> is a smart and intuitive
				expense tracking application designed to help you manage your finances
				effortlessly. With features like budgeting, real-time expense tracking,
				and insightful reports
			</Text>
			<Text style={styles.text2}>
				{" "}
				<Text style={styles.text3}>Xpense</Text> ensures you stay in control of
				your spending. Our goal is to provide a seamless financial management
				experience with secure data storage and personalized notifications to
				keep you on track. Take charge of your finances today with Xpense!
			</Text>
		</View>
	);
};

export default About;
