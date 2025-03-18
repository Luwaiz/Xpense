import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		padding: 16,
	},
	ActivityIndicator: {
		marginTop: 16,
	},
	avatar: {
		width: width / 3,
		height: width / 3,
		borderRadius: 300,
		marginTop: 20,
	},
	editContainer: {
		backgroundColor: colors.secondaryGrey,
		borderRadius: 100,
		padding: 10,
		position: "absolute",
		right: 0,
		bottom: -5,
	},
});
export default styles;
