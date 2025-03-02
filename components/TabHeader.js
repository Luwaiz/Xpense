import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../hooks/Colours";
import { useNavigation } from "@react-navigation/native";
import AuthStore from "../hooks/ZustandStore";

const TabHeader = ({ route }) => {
	const name = AuthStore((state) => state.name);
	const email = AuthStore((state) => state.email)
	const avatar = AuthStore((state) => state.avatar);


	const navigation = useNavigation();
	const navigateBack = () => {
		navigation.goBack();
	};
	return (
		<SafeAreaView style={styles.container}>
			{route.name === "Home" ? (
				<View style={styles.homeContainer}>
					<View style={styles.circle}>
						<Image source={{ uri: avatar }} style={styles.avatar} />
                
					</View>
					<View>
						<Text style={styles.Name}>{name}</Text>
						<Text style={styles.email}>{email}</Text>
					</View>
				</View>
			) : (
				<View style={styles.innerContainer}>
					<TouchableOpacity onPress={() => navigateBack()}>
						<AntDesign name="arrowleft" size={24} color="black" />
					</TouchableOpacity>
					<Text style={styles.routeName}>{route.name}</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

export default TabHeader;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		justifyContent: "center",
	},
	innerContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	routeName: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginHorizontal: "auto",
		paddingRight: 10,
	},
	circle: {
		height: 50,
		width: 50,
		borderRadius: 25,
		backgroundColor: "#fff",
		borderWidth: 1.5,
		borderColor: colors.primary,
		overflow: "hidden",
	},
	homeContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	Name: {
		fontSize: 18,
		fontWeight: "bold",
	},
	email: {
		fontSize: 14,
	},
	avatar: {
		resizeMode: "center",
		width: "100%",
		height: "100%",
	},
});
