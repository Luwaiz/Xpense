import { StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	barContainer: {
		height: "50%",
	},
	section: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: "auto",
		gap: 20,
		marginBottom: 10,
	},
	sectionText: {
		fontSize: 16,
		fontWeight: "500",
		color: colors.greyText,
	},
	recent: {
		fontSize: 18,
		fontWeight: "bold",
	},
	underline: {
		marginBottom: 40,
		marginHorizontal: 70,
		borderRadius: 5,
		height: 2,
		backgroundColor: colors.greyText,
	},
	activeLine: {
		width: "45%",
		borderRadius: 5,
		height: 2,
		backgroundColor: colors.primary,
	},
	recentBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 16,
		marginBottom: 10,
	},
	viewAll: {
		fontSize: 14,
		fontWeight: "500",
		color: "#0066F5",
	},
	bottomContainer: {
		flex:1,
		width:"100%"
	},
});
export default styles;
