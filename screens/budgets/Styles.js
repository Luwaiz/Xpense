import { StyleSheet } from 'react-native'
import { colors } from '../../hooks/Colours';

const styles = StyleSheet.create({
container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	listContent: {
		paddingBottom: 20,
	},
	budgetItem: {
		// backgroundColor: "#f8f8f8",
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
		marginTop: 5,
	},
	
});
export default styles
