import { Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import ActiveButton from "../../components/ActiveButton";
import InActiveButton from "../../components/InActiveButton";
import { colors } from "../../hooks/Colours";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Xpense from "../../assets/svg/XpenseLogo.svg";
import styles from "./Styles";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const AuthOption = ({ navigation }) => {
	const { promptAsync } = useGoogleAuth();

	const ToLogin = () => navigation.navigate("Login");
	const ToSignup = () => navigation.navigate("SignUp");

	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Image
					source={require("../../assets/images/cardImage.png")}
					style={styles.Image}
				/>
				<Xpense />
			</View>

			<BottomSheet
				backgroundStyle={{ borderRadius: 50 }}
				handleComponent={null}
				snapPoints={["45%"]}
			>
				<BottomSheetView style={styles.sheet}>
					<Text style={styles.welcome}>Welcome!</Text>
					<ActiveButton text={"Sign up"} onPress={ToSignup} width={200} />
					<InActiveButton text={"Log in"} onPress={ToLogin} width={200} />
					{/* Google Button */}
					<TouchableOpacity
						style={{
							marginTop: 10,
							backgroundColor: "#fff",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 10,
							borderWidth: 1,
							borderColor: colors.lightGrey3,
							padding: 10,
							width: 200,
						}}
						onPress={() => promptAsync()}
					>
						<Image
							source={{
								uri: "https://developers.google.com/identity/images/g-logo.png",
							}}
							style={{ width: 30, height: 30, marginRight: 8 }}
						/>
						<Text style={{ fontSize: 14, color: "#000" }}>
							Continue with Google
						</Text>
					</TouchableOpacity>
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
};

export default AuthOption;
