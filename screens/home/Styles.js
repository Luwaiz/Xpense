import { ScrollViewComponent, StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
	},
	ContentContainer: {
		paddingBottom: 50,
	},
	scroll: {
		flex: 1,
		width: "100%",
	},
	scrollContainer: {
		flexDirection: "column",
		justifyContent: "space-around",
	},
	options: {
		width: "100%",
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	recentText: {
		fontSize: 18,
		fontWeight: "bold",
		alignSelf: "flex-start",
		paddingLeft: 16,
		marginBottom: 2,
	},
	optionContainer: {
		width: "100%",
		flexDirection: "row",
		borderWidth: 1,
		borderColor: colors.secondaryGrey,
		padding: 10,
		marginBottom: 10,
		borderRadius: 30,
		alignItems: "center",
		gap: 10,
	},
	icon: {
		borderWidth: 1,
		borderColor: colors.secondaryGrey,
		width: 40,
		borderRadius: "50%",
		height: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	iconText: {
		fontSize: 16,
		color: "black",
		fontWeight: "bold",
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
		fontSize: 14,
	},
	bottom: {
		width: "100%",
	},
});
export default styles;
