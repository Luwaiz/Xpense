import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { launchCamera } from "react-native-image-picker";
import { keepLocalCopy, pick } from "@react-native-documents/picker";
import { viewDocument } from "@react-native-documents/viewer";

const TestImageUpload = () => {
	const [document, setDocument] = useState();

	const FileUpload = async () => {
		console.log("Uploading");
		try {
			const [pickResult] = await pick({ allowMultiSelection: true });
			console.log(pickResult);
			const [localCopy] = await keepLocalCopy({
				files: [
					{
						uri: pickResult.uri,
						fileName: pickResult.name ?? "fallbackName",
					},
				],
				destination: "documentDirectory",
			});
			setDocument(localCopy);
			console.log("Local copy:", decodeURI(localCopy));
		} catch (e) {
			console.log("Error picking a image", e);
		}
	};

	const CameraLauncher = async (isCamera) => {
		const options = {
			mediaType: isCamera ? "photo" : "video",
		};
		try {
			const Launch = await launchCamera(options);
			console.log("Launched", Launch);
		} catch (e) {
			console.log("Camera launch failed", e);
		}
	};

	const ViewDocument = async () => {
		console.log("Viewing");
		try {
			viewDocument({ uri: document?.localUri }).catch((e) => {
				console.log("Error picking a view", e);
			});
			console.log("Document:", document);
		} catch (e) {
			console.log("Error viewing a document", e);
		}
	};

	return (
		<View style={styles.container}>
			<Text>TestImageUpload</Text>
			<TouchableOpacity style={styles.button} onPress={() => FileUpload()}>
				<Text>Upload Document</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => CameraLauncher(true)}
			>
				<Text>Take Photo</Text>
			</TouchableOpacity>
			<Image source={{ uri: document?.localUri }} style={styles.image} />

			<TouchableOpacity style={styles.button} onPress={() => ViewDocument()}>
				<Text>View Document</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TestImageUpload;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		backgroundColor: "green",
		padding: 10,
		borderRadius: 10,
		marginTop: 20,
	},
	image: {
		width: 200,
		height: 200,
		marginTop: 20,
		borderRadius: 10,
		resizeMode: "contain",
	},
});

// import {
// 	FlatList,
// 	PermissionsAndroid,
// 	StyleSheet,
// 	Text,
// 	View,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import styles from "./Styles";
// import ActiveButton from "../../components/ActiveButton";
// import SmsAndroid from "react-native-get-sms-android";
// const OTPVerification = () => {
// 	const [smsList, setSmsList] = useState([]);

// 	const requestPermission = async () => {
// 		try {

// 			const granted = await PermissionsAndroid.request(
// 				PermissionsAndroid.PERMISSIONS.READ_SMS,
// 				{
// 					title: "SMS Permissions",
// 					message: "This app needs access to your SMS to verify the OTP",
// 					buttonNeutral: "Ask Me Later",
// 					buttonNegative: "Cancel",
// 					buttonPositive: "OK",
// 				}
// 			);
//       console.log("Permission granted: " + granted);

// 			return granted === PermissionsAndroid.RESULTS.GRANTED;
// 		} catch (e) {
// 			console.log("Error", e);
// 			return false;
// 		}
// 	};

// 	useEffect(() => {
// 		const fetchSMS = async () => {
// 			const awaitPermission = await requestPermission();
// 			console.log(awaitPermission);
// 			if (awaitPermission) {
// 				SmsAndroid.list(
// 					JSON.stringify({
// 						box: "inbox",
// 						address:"+2348031824083"

// 					}),
// 					(fail) => {
// 						console.log("Failed to get SMS, error:", fail);
// 					},
// 					(count, smSList) => {
// 						const message = JSON.parse(smSList);
// 						setSmsList(message);
// 					}
// 				);
// 			}
// 		};
// 		fetchSMS();
// 	}, []);
// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.heading}>OTPVerification</Text>
// 			<ActiveButton text={"get sms"} />
// 			<FlatList
// 				renderItem={renderItem}
// 				data={smsList}
// 				keyExtractor={(item, index) => index.toString()}
// 				ListEmptyComponent={<Text>no sms found</Text>}
// 			/>
// 		</View>
// 	);
// };

// const renderItem = ({ item }) => {
// 	return (
// 		<View style={styles.item}>
// 			<Text style={styles.itemText}>{item?.address}</Text>
// 			<Text style={styles.itemText}>{item?.body}</Text>
// 			<Text style={styles.itemText}>
// 				{new Date(item?.date).toLocaleTimeString()}
// 			</Text>
// 		</View>
// 	);
// };

// export default OTPVerification;
