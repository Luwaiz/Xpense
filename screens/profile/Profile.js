import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	ToastAndroid,
	Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import ActiveButton from "../../components/ActiveButton";
import AvatarModal from "../../components/AvatarModal";
import Entypo from "@expo/vector-icons/Entypo";
import AuthStore from "../../hooks/ZustandStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import UserProfileHook from "../../hooks/UserProfileHook";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Profile = ({ navigation }) => {
	const [modal, setModal] = useState(false);
	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const [loading, setLoading] = useState(false);

	const avatarImage = AuthStore((state) => state.avatar);
	const name = AuthStore((state) => state.name);
	const email = AuthStore((state) => state.email);
	const Logout = AuthStore((state) => state.logout);

	const LogOut = () => {
		setLoading(true);
		Logout();
		setLoading(false);
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

	const settingsContent = [
		{
			title: "My Account",
			description: "Edit Profile Information",
			icon: <Ionicons name="person" size={20} color="white" />,
			navigate: () => navigation.navigate("My Account"),
		},
		{
			title: "About App",
			description: "Further Information on our services",
			icon: <AntDesign name="appstore1" size={20} color="white" />,
			navigate: () => navigation.navigate("About App"),
		},
		{
			title: "Privacy Policy",
			description: "Terms and Conditions",
			icon: <MaterialIcons name="privacy-tip" size={20} color="white" />,
			navigate: () => navigation.navigate("Privacy Policy"),
		},
	];

	useEffect(() => {
		getProfile();
	}, [selectedAvatar]);

	return (
		<View style={styles.container}>
			<View>
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
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.email}>{email}</Text>

			{/* settings section 	 */}
			<View style={styles.sectionContainer}>
				{settingsContent.map((item, index) => (
					<Pressable
						key={index.toString()}
						style={styles.section}
						onPress={() => item?.navigate()}
					>
						<View style={styles.iconContainer}>{item.icon}</View>
						<View>
							<Text style={styles.sectionTitle}>{item.title}</Text>
							<Text style={styles.sectionDesc}>{item.description}</Text>
						</View>
						<Entypo
							name="chevron-small-right"
							size={24}
							color="black"
							style={styles.icon}
						/>
					</Pressable>
				))}
			</View>
			{/* Log out button */}
			<ActiveButton text={"Log out"} width={"80%"} onPress={() => LogOut()} loading={loading} />

			{/* Avatar modal when user press edit button and selected avatar on modal and update avatar in user profile state and success toast message */}

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
