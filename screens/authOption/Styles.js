import { StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		alignItems: "center",
	},
	topContainer: {
		flex: 0.6,
		backgroundColor: colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	sheet: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 30,
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	welcome: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 20,
		textAlign: "center",
	},
});

export default styles;
