import {
	Dimensions,
	Image,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import AvatarsList from "../constants/Avatars";
const { width, height } = Dimensions.get("window");
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../hooks/Colours";
import Entypo from "@expo/vector-icons/Entypo";
import AuthStore from "../hooks/ZustandStore";
import axios from "axios";
import API from "../hooks/API";
import ActiveButton from "./ActiveButton";
import InActiveButton from "./InActiveButton";

const AvatarModal = ({ modal, setModal, setSelectedAvatar, successToast }) => {
	const [selected, setSelected] = useState(null);
	const [loading, setLoading] = useState(false);

	const token = AuthStore((state) => state.token);

	const handleSelect = (avatar) => {
		console.log(avatar);
		setSelected(avatar);
	};

	const saveAvatar = async (avatar) => {
		setLoading(true);
		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.post(
				API.saveAvatar,
				{ avatarUrl: avatar },
				header
			);
			setSelectedAvatar(avatar);
			setLoading(false);
			setModal(false);
			successToast();
		} catch (err) {
			console.error("Failed to save avatar: ", err.response.data);
			setLoading(false);
		}
	};
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modal}
			onRequestClose={() => setModal(false)}
			style={StyleSheet.absoluteFill}
		>
			<View style={styles.container}>
				<View style={styles.modalView}>
					<Pressable onPress={() => setModal(false)} style={styles.closeButton}>
						<AntDesign name="closecircle" size={30} color={colors.primary} />
					</Pressable>
					<Text style={styles.modalText}>Select an Avatar</Text>
					<ScrollView
						contentContainerStyle={styles.contentContainer}
						style={styles.ScrollView}
					>
						{AvatarsList.map((avatar) => (
							<Pressable
								key={avatar?.name}
								onPress={() => handleSelect(avatar)}
							>
								<Image
									source={{ uri: avatar?.url }}
									style={[
										styles.avatar,
										{
											borderWidth: selected?.name === avatar.name ? 2 : 0,
											borderColor:
												selected?.name === avatar.name
													? colors.primary
													: colors.border,
										},
									]}
								/>
								{selected?.name === avatar.name && (
									<View style={styles.checkContainer}>
										<Entypo name="check" size={20} color={colors.primary} />
									</View>
								)}
							</Pressable>
						))}
					</ScrollView>
					{selected !== null ? (
						<ActiveButton
							text={"Save"}
							onPress={() => saveAvatar(selected.url)}
							loading={loading}
						/>
					) : (
						<InActiveButton text={"Save"} disabled={true} />
					)}
				</View>
			</View>
		</Modal>
	);
};

export default AvatarModal;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalView: {
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 20,
		width: "85%",
		justifyContent: "center",
		alignItems: "center",
		maxHeight: height - 200,
	},
	modalText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
	},
	contentContainer: {
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		paddingBottom: 20,
	},
	avatar: {
		width: width / 3.5,
		height: width / 3.5,
		borderRadius: 300,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: colors.primaryGrey,
	},
	closeButton: {
		position: "absolute",
		top: 20,
		right: 20,
	},
	checkContainer: {
		position: "absolute",
		bottom: 10,
		right: 10,
		zIndex: 100,
		backgroundColor: "white",
		borderRadius: 50,
		width: 25,
		height: 25,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: colors.primary,
	},
	scrollView: {
		marginBottom: 30,
		height: height - 250,
		width: "100%",
		backgroundColor: "white",
	},
});
