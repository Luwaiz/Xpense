import { StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 16,
		alignItems: "center",
	},
	text: {
		fontSize: 18,
		fontWeight: "semibold",
        paddingBottom:-16,
        paddingTop: 16,
	},
	button: {
		marginTop: "auto",
		marginBottom: 20,
	},
	check: {
		marginTop: "auto",
	},
});
export default styles;
