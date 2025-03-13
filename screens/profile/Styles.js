import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",

		alignItems: "center",
	},
	avatar: {
		width: width / 3,
		height: width / 3,
		borderRadius: 300,
		marginTop: 20,
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 10,
	},
	email: {
		fontSize: 14,
		color: colors.greyText,
	},
	sectionContainer: {
		marginTop: "auto",
		borderWidth: 0.5,
		borderColor: colors.primaryGrey,
		padding: 10,
		width: width - 32,
		borderRadius: 10,
		marginBottom: "auto",
	},
	section: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
	},
	sectionTitle: {
		fontSize: 14,
	},
	sectionDesc:{
		fontSize: 12,
		color: colors.greyText,
		marginTop: 5,
	},
	editContainer: {
		backgroundColor: colors.secondaryGrey,
		borderRadius: 100,
		padding: 10,
		position: "absolute",
		right: 0,
		bottom: -5,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor:colors.primary,
		marginRight: 10,
	},
	icon:{
		marginLeft:"auto"
	}
});
export default styles;
