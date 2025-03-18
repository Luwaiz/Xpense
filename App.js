import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./navigation/Navigation";

export default function App() {


	return (
		<GestureHandlerRootView style={styles.container}>
			<SafeAreaProvider>
				{/*Entrance to Main application  */}
				<Navigation />
				<StatusBar style="auto" />
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
