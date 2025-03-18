import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	ToastAndroid,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import AuthStore from "../../hooks/ZustandStore";
import axios from "axios";
import API from "../../hooks/API";
import EditableInput from "../../components/EditableInput";
import AntDesign from "@expo/vector-icons/AntDesign";
import AvatarModal from "../../components/AvatarModal";
import UserProfileHook from "../../hooks/UserProfileHook";
import SvgUri from "react-native-svg";

const EditAccount = () => {
	const [modal, setModal] = useState(false);
	const [selectedAvatar, setSelectedAvatar] = useState(null);

	const avatarImage = AuthStore((state) => state.avatar);
	const fullName = AuthStore((state) => state.name);
	const email = AuthStore((state) => state.email);
	const token = AuthStore((state) => state.token);
	const setName = AuthStore.getState().setName;
	const setEmail = AuthStore.getState().setEmail;

	const [editableStates, setEditableStates] = useState({
		fullName: false,
		email: false,
	});
	const [name, set_Name] = useState("");
	const [mail, set_Email] = useState("");
	const [loading, setLoading] = useState(false);

	const successfulToast = () => {
		ToastAndroid.show("Updated successfully !", ToastAndroid.SHORT);
	};

	const successToast = () => {
		ToastAndroid.show("Updated successfully !", ToastAndroid.SHORT);
	};
	const getProfile = async () => {
		try {
			await UserProfileHook();
		} catch (err) {
			console.log("Error getting profile", err.response);
			// handle error here
		}
	};

	const fetchUserProfile = async () => {
		try {
			const response = await axios.get(API.getProfile, {
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log(response?.data);
			setName(response?.data?.user?.name);
			setEmail(response?.data?.user?.email);
		} catch (err) {
			console.log(err?.response?.data?.message);
			alert("Failed to fetch profile. Please try again.");
		}
	};

	const handleEdit = async (field, value) => {
		console.log("handleEdit", field, value);
		setLoading(true);
		try {
			const header = { headers: { Authorization: `Bearer ${token}` } };
			const request = { [field === "fullName" ? "name" : field]: value };
			console.log(request);

			const response = await axios.patch(API.updateProfile, request, header);
			console.log(response?.data);

			if (response?.data) {
				console.log("calling profile");
				await fetchUserProfile(); // Fetch only if the update is successful
				setLoading(false);
				successToast();
				console.log("called profile");
			}
		} catch (err) {
			console.log(err?.response?.data);
			alert("Failed to edit profile. Please try again.");
			setLoading(false);
		} finally {
			setLoading(false); // Ensure loading state is updated after request
		}
	};
	const Edit = async (field, value) => {
		setEditableStates((prev) => {
			const isCurrentlyEditable = prev[field];

			// If already editable, save the changes
			if (isCurrentlyEditable) {
				handleEdit(field, value);
			}

			// Toggle the state
			return { ...prev, [field]: !isCurrentlyEditable };
		});
	};

	useEffect(() => {
		getProfile();
	}, [selectedAvatar]);

	return (
		<View style={styles.container}>
			<View style={{ marginBottom: 50 }}>
				<Image
					source={
						avatarImage !== ""
							? { uri: avatarImage }
							: require("../../assets/images/profile.png")
					}
					style={styles.avatar}
				/>
				<Pressable onPress={() => setModal(true)} style={styles.editContainer}>
					<AntDesign name="edit" size={24} color="black" />
				</Pressable>
			</View>
			<EditableInput
				text="Full Name"
				editable={editableStates.fullName}
				Edit={() => Edit("fullName", name)} // Fix field name
				value={fullName} // Ensure this is updated
				onChangeText={(text) => set_Name(text)}
				loading={loading}
			/>

			<EditableInput
				text="Email"
				editable={editableStates.email}
				Edit={() => Edit("email", mail)} // Fix field name
				value={email} // Ensure this is updated
				onChangeText={(text) => set_Email(text)}
				loading={loading}
			/>

			{modal && (
				<AvatarModal
					modal={modal}
					setModal={setModal}
					setSelectedAvatar={setSelectedAvatar}
					successToast={successfulToast}
				/>
			)}
		</View>
	);
};

export default EditAccount;
