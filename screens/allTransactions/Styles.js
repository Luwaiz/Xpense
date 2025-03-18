import { StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	ActivityIndicator: {
		marginTop: 16,
	},
	header: {
		paddingVertical: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 0.5,
		marginHorizontal: 10,
		marginBottom: 16,
		paddingHorizontal: 6,
	},
	headerText: {
		fontSize: 24,
		fontWeight: "500",
		color: "black",
	},
	cont: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	Buttons: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 16,
		marginBottom: 10,
	},
	button: {
		backgroundColor: colors.primaryGrey,
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 5,
	},
	buttonText: {
		color: "white",
		fontSize: 12,
	},
	noExpenseCont: {
		alignItems: "center",
		justifyContent:"center",
		marginBottom:"auto",
		marginTop:"auto",
	},
	noExpenseText: {
		marginTop: 20,
		textAlign: "center",
		fontWeight: "500",
		fontSize: 16,
	},
});

export default styles;