import { Dimensions, StyleSheet} from 'react-native'
import { colors } from '../../hooks/Colours';
const { width, height } = Dimensions.get("screen");


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	page: {
		backgroundColor: "white",
		width: width,
		height: height,
		alignItems: "center",
	},
	imagery: {
		width: width - 10,
		height: height * 0.5,
		justifyContent: "center",
		alignItems: "center",
	},
	texts: {
		height: height * 0.18,
		alignItems: "center",
		justifyContent: "center",
	},
	head: {
		fontSize: 32,
		fontWeight: "700",
		color: colors.primary,
		paddingHorizontal: 30,
		textAlign: "center",
	},
	subHead: {
		width: width - 50,
		fontSize: 14,
		fontWeight: "400",
		color: colors.greyText,
		marginTop: 10,
		textAlign: "center",
		paddingHorizontal: 30,
	},
});
export default styles
