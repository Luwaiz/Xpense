import { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { initializeApp } from "@react-native-firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyAH62GHJrcKLVa91nOBM_Ii_X2XbaNs3zE",
	authDomain: "xpense-bafa7.firebaseapp.com",
	databaseURL: "https://Xpense.firebaseio.com",
	projectId: "xpense-bafa7",
	storageBucket: "xpense-bafa7.appspot.com",
	messagingSenderId: "189626274072",
	appId: "1:189626274072:android:2cf078c11e0eec800b8e6d",
};

// 🔥 Initialize Firebase before calling messaging()
const app = initializeApp(firebaseConfig);

const requestUserPermission = async () => {
	try {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			console.log("Notification permission granted.");
		} else {
			console.log("Notification permission denied.");
		}
	} catch (error) {
		console.error("Error requesting permission:", error);
	}
};

const FirebaseMessage = () => {
	const [fcmToken, setFcmToken] = useState(null);

	const fetchToken = async () => {
		try {
			const token = await messaging().getToken();
			if (token) {
				console.log("FCM Token:", token);
				setFcmToken(token);
			} else {
				console.warn("No FCM token received");
			}
		} catch (error) {
			console.error("Error fetching token:", error);
		}
	};

	useEffect(() => {
		requestUserPermission();
		fetchToken();

		// Handle token refresh
		const unsubscribe = messaging().onTokenRefresh((newToken) => {
			console.log("FCM Token refreshed:", newToken);
			setFcmToken(newToken);
		});

		return () => unsubscribe();
	}, []);

	return null; // Modify this if you want to display something
};

export default FirebaseMessage;
