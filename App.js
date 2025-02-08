import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./navigation/Navigation";
import TestImageUpload from "./screens/TestImageUpload";

export default function App() {
	return (
		<GestureHandlerRootView style={styles.container}>
			<SafeAreaProvider >
				{/* <TestImageUpload /> */}
				<Navigation />
				<StatusBar style="auto" />
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:"white"
	},
});
