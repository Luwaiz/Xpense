import { StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	ActivityIndicator: {
		marginTop: 16,
	},
	topContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
		width: "90%",
	},
	BudgetName: {
		fontSize: 18,
		fontWeight: "500",
		color: "black",
	},
	BudgetTime: {
		fontSize: 14,
		fontWeight: "400",
		color: colors.primaryGrey,
		alignSelf: "flex-end",
		paddingRight:16
	},
	noExpenseCont: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: "auto",
		marginTop: "auto",
	},
	noExpenseText: {
		marginTop: 20,
		textAlign: "center",
		fontWeight: "500",
		fontSize: 16,
	},
});
export default styles;
