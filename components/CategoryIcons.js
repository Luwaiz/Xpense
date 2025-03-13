import { StyleSheet, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CategoryIcons = ({ category }) => {
	if (category === "Subscription") {
		return (
			<View style={[styles.container, { backgroundColor: "#6A0DAD" }]}>
				<MaterialCommunityIcons name="calendar-clock" size={24} color="white" />
			</View>
		);
	}
	if (category === "Shopping") {
		return (
			<View style={[styles.container, { backgroundColor: "#0A58CA" }]}>
				<MaterialCommunityIcons name="cart" size={24} color="white" />
			</View> // Removed stray semicolon
		);
	}
	if (category === "Health Insurance") {
		return (
			<View style={[styles.container, { backgroundColor: "#FF8F00" }]}>
				<MaterialCommunityIcons name="medical-bag" size={24} color="white" />
			</View>
		);
	}
	if (category === "Food") {
		return (
			<View style={[styles.container, { backgroundColor: "#191970" }]}>
				<MaterialCommunityIcons
					name="food-fork-drink"
					size={24}
					color="white"
				/>
			</View>
		);
	}
	if (category === "Transportation") {
		return (
			<View style={[styles.container, { backgroundColor: "#9966CC" }]}>
				<MaterialCommunityIcons name="car" size={24} color="white" />
			</View>
		);
	}
	if (category === "Entertainment") {
		return (
			<View style={[styles.container, { backgroundColor: "#FF0080" }]}>
				<MaterialCommunityIcons name="music-note" size={24} color="white" />
			</View>
		);
	}
	if (category === "Others") {
		return (
			<View style={[styles.container, { backgroundColor: "#41644A" }]}>
				<MaterialCommunityIcons
					name="information-outline"
					size={24}
					color="white"
				/>
			</View>
		);
	}

	// 🔥 Fix: Ensure a default return value (avoid undefined issues)
	return <View style={[styles.container, { backgroundColor: "#D3D3D3" }]} />;
};

export default CategoryIcons;

const styles = StyleSheet.create({
	container: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
});
