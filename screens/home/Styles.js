import { ScrollViewComponent, StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
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
		// flexDirection: "row",
		// marginTop: 20,
		// padding: 10,
		// borderRadius: 5,
		// height: 100,
		// marginBottom: 30,
		// justifyContent: "space-around",
		// alignItems: "center",
		width: "100%",
		padding: 16,
	},
	recentText: {
		fontSize: 18,
		fontWeight: "bold",
		alignSelf: "flex-start",
		paddingLeft: 16,
		paddingBottom: 8,
	},
	optionContainer: {
		width: "100%",
		flexDirection: "row",
		borderWidth: 1,
		borderColor: colors.secondaryGrey,
		padding:10,
		marginBottom:10,
		borderRadius:30,
		alignItems: "center",
		gap:10,
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
	iconText:{
		fontSize: 16,
        color: "black",
		fontWeight: "bold",
	}
});
export default styles;
