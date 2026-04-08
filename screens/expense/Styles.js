import { StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
	topContainer: {
		height: 200,
		backgroundColor: colors.primary,
		justifyContent: "flex-end",
		padding: 16,
	},
	sheet: {
		flex: 1,
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingHorizontal: 16,
	},
	sheetContent: {
		paddingVertical: 30,
		flexGrow: 1,
	},
	InputContainer: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		marginTop: 10,
	},
	input: {
		flex: 1,
		fontSize: 64,
		fontWeight: "300",
		color: "white",
	},
	text1: {
		fontSize: 64,
		fontWeight: "300",
		color: "white",
	},
	text2: {
		fontSize: 16,
		color: colors.secondaryGrey,
	},
	dropdown: {
		height: 48,
		borderColor: colors.primaryGrey,
		borderWidth: 0.5,
		paddingHorizontal: 10,
		borderRadius: 8,
		marginBottom: 16,
	},
	icon: {
		marginRight: 5,
	},
	placeholderStyle: {
		fontSize: 16,
		color: colors.greyText,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
		color: colors.greyText,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	button: {
		marginTop: 24,
	},
	attachment: {
		height: 48,
		borderColor: colors.primaryGrey,
		borderWidth: 0.5,
		paddingHorizontal: 10,
		borderRadius: 8,
		alignItems: "center",
		borderStyle: "dashed",
		marginTop: 16,
		justifyContent: "center",
		flexDirection: "row",
		gap: 10,
	},
	attachmentText: {
		fontSize: 16,
		color: colors.greyText,
	},
});

export default styles;
