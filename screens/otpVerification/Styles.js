import { StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors?.primary,
	},
	TopContainer: {
		flex: 0.3,
		alignItems: "center",
		justifyContent: "center",
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
	heading: {
		fontSize: 24,
		fontWeight: "500",
		color: "black",
		marginVertical: 20,
	},
	Text: {
		fontSize: 14,
		color: "black",
		marginBottom: 10,
	},
	otpInput: {
		alignSelf: "center",
		marginBottom: "auto",
		marginTop: 30,
	},
	button:{
		marginTop:20
	},
	bottomText:{
		flexDirection:"row",
		justifyContent:"center",
        alignItems:"center",
		gap:20
	}
});

export default styles;
