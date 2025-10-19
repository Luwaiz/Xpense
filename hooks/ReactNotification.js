import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axios from "axios";
import API from "./API";
import AuthStore from "./ZustandStore";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
	let token;
  
	if (Platform.OS === "android") {
	  await Notifications.setNotificationChannelAsync("myNotificationChannel", {
		name: "Budget Alerts",
		importance: Notifications.AndroidImportance.MAX,
		vibrationPattern: [0, 250, 250, 250],
		lightColor: "#FF231F7C",
	  });
	}
  
	if (Device.isDevice) {
	  const { status: existingStatus } = await Notifications.getPermissionsAsync();
	  let finalStatus = existingStatus;
  
	  if (existingStatus !== "granted") {
		const { status } = await Notifications.requestPermissionsAsync();
		finalStatus = status;
	  }
  
	  if (finalStatus !== "granted") {
		alert("Failed to get push token for push notification!");
		return;
	  }
  
	  try {
		const projectId = Constants.expoConfig?.extra?.eas?.projectId;
		if (!projectId) {
		  console.error("⚠️ Expo Project ID is missing.");
		  return;
		}
		console.log("projectId: " + projectId);
  
		token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
		console.log("🔔 Push Token:", token);
  
		const authToken = AuthStore.getState().token;
  
		const response = await axios.post(
		  API.savePushToken,
		  {
			pushToken: token,
		  },
		  { headers: { Authorization: `Bearer ${authToken}` } }
		);
		console.log("notification : ", response.data);
	  } catch (e) { 
	  }
	} else {
	  alert("Must use a physical device for Push Notifications");
	}
  
	return token;
  }

export default function Notify() {
	const [expoPushToken, setExpoPushToken] = useState("");
	const [channels, setChannels] = useState([]);
	const [notification, setNotification] = useState(null);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then(
			(token) => token && setExpoPushToken(token)
		);

		if (Platform.OS === "android") {
			Notifications.getNotificationChannelsAsync().then((value) =>
				setChannels(value ?? [])
			);
		}

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
		>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Text>Title: {notification?.request?.content?.title} </Text>
				<Text>Body: {notification?.request?.content?.body}</Text>
				<Text>
					Data:{" "}
					{notification
						? JSON.stringify(notification.request.content.data)
						: "No data"}
				</Text>
			</View>
			<Button
				title="Press to schedule a notification"
				onPress={async () => {
					await schedulePushNotification();
				}}
			/>
		</View>
	);
}

async function schedulePushNotification() {
	const notificate = "Xpense";

	console.log("sending notification");
	await Notifications.scheduleNotificationAsync({
		content: {
			title: notificate,
			body: "Here is the notification body",
		},
		trigger: { seconds: 1 }, // Fix here (no need for SchedulableTriggerInputTypes)
	});
}
