import {
	Dimensions,
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Check from "../assets/svg/success.svg";
const { width, height } = Dimensions.get("screen");

const AddSuccessModal = ({ modal, setModal }) => {
	const navigation = useNavigation();
	const ToHome = () => {
		setModal(false);
		navigation.navigate("AppStack", {
			screen: "HomePage",
			params: {
				screen: "Home",
			},
		});
	};
	return (
		<Modal
			visible={modal}
			style={styles.modalCont}
			transparent
			statusBarTranslucent
		>
			<TouchableWithoutFeedback onPress={() => ToHome()}>
				<View style={styles.modalCont}>
					<View style={styles.modal}>
						<View style={styles.container}>
							<View style={styles.icon}>
								<Check width={50} height={50} />
							</View>
							<Text style={styles.text}>
								Transaction has been successfully added!
							</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default AddSuccessModal;

const styles = StyleSheet.create({
	modalCont: {
		flex: 1,
	},
	modal: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		flex: 1,
	},
	text: {
		fontWeight: "regular",
		textAlign: "center",
		fontSize: 16,
		color: "black",
		marginBottom: 20,
	},
	container: {
		backgroundColor: "white",
		borderRadius: 5,
		alignItems: "center",
		padding: 24,
	},
	icon: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	button: {
		marginTop: "auto",
	},
});
