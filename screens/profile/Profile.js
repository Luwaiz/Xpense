import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import AvatarsList from "../../constants/Avatars";
import ActiveButton from "../../components/ActiveButton";
import AvatarModal from "../../components/AvatarModal";
import axios from "axios";
import API from "../../hooks/API";
import AuthStore from "../../hooks/ZustandStore";
import UserProfileHook from "../../hooks/UserProfileHook";

const Profile = () => {
	const [modal, setModal] = useState(false);
	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const [userProfile, setUserProfile] = useState(null);
	const [avatar, setAvatar] = useState(null);

	const token = AuthStore((state) => state.token);
	const avatarImage = AuthStore((state) => state.avatar);

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
	useEffect(() => {
		getProfile();
	}, [selectedAvatar]);

	return (
		<View style={styles.container}>
			<Image
				source={
					avatarImage !== ""
						? { uri: avatarImage }
						: require("../../assets/images/profile.png")
				}
				style={styles.avatar}
			/>
			<ActiveButton text={"Choose Avatar"} onPress={() => setModal(true)} />

			{modal && (
				<AvatarModal
					modal={modal}
					setModal={setModal}
					setSelectedAvatar={setSelectedAvatar}
					successToast={successToast}
				/>
			)}
		</View>
	);
};

export default Profile;
