import { StyleSheet } from 'react-native'
import { colors } from '../../hooks/Colours';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal:16
	},
	heading: {
		fontSize: 36,
		fontWeight: "medium",
	},
	bottomContainer: {
		flex: 0.6,
		backgroundColor: "white",
		marginTop:"auto"
	},
	otpInput:{
		height:100,
		marginVertical:40
	},
	button: {
		marginTop: "auto",
		marginBottom: 20,
	},
	itemText:{
		fontSize: 16,
        marginTop: 10,
	},
	resendOtp:{
		fontSize:16,
        color:colors?.primary,
        marginTop:10,
		textDecorationLine:"underline"
	}

});
export default styles
