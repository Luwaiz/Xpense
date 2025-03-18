import { StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	topContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	listContent: {
		paddingBottom: 20,
	},
	ActivityIndicator: {
		marginBottom: 20,
	},
	budgetItem: {
		padding: 10,
		marginBottom: 15,
		borderRadius: 8,
		borderWidth: 0.5,
		borderColor: colors.primaryGrey,
	},
	itemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	category: {
		fontSize: 16,
		fontWeight: "500",
	},
	amount: {
		fontSize: 14,
		color: "#333",
	},
	progressBar: {
		marginTop: 5,
	},
	addButton: {
		backgroundColor: "#007BFF",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 10,
	},
	addButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	limit: {
		fontSize: 12,
		color: "red",
	},

	noBudgetCont: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: "auto",
		marginTop: "auto",
		gap: 20,
	},
	noBudgetText: {
		marginTop: 20,
		textAlign: "center",
		fontWeight: "500",
		fontSize: 16,
	},
	editContainer: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		elevation: 5, // Add shadow effect (Android)
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84, // Adjust positioning if needed
		zIndex: 10, // Ensure it stays on top
		width: "30%",
		marginBottom: 10,
		alignSelf: "flex-end",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	editText: {
		color: "blue",
		fontWeight: "bold",
		textAlign: "center",
	},
	bottomContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 15,
	},
	date: {
		fontSize: 12,
		color: colors.greyText,
	},
});
export default styles;
