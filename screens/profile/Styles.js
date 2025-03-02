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
		width: width/3,
		height: width/3,
		borderRadius: 300,
		borderWidth: 2,
		borderColor: colors.primaryGrey,
		marginTop:20
	},
});
export default styles;
