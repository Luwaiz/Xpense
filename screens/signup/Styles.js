import { StyleSheet } from 'react-native'
import { colors } from '../../hooks/Colours';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors?.primary,
	},
	TopContainer: {
		flex: 0.3,
		paddingHorizontal: 20,
	},
	heading: {
		fontSize: 32,
		fontWeight: "bold",
		color: "white",
		marginTop: 130,
	},
	subheading: {
		fontSize: 14,
		color: "white",
		marginTop: 10,
	},
	bottomContainer: {
		flex: 0.7,
		backgroundColor: "white",
		padding: 16,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	logo: {
		position: "absolute",
		left: 20,
	},
	SignUp: {
		fontSize: 32,
		fontWeight: "bold",
		color: colors?.primary,
		marginBottom: 10,
	},
	button: {
		marginTop: 20,
	},
});
export default styles
