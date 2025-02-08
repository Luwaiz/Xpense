import { StyleSheet } from 'react-native'
import { colors } from '../../hooks/Colours';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent:"center",
		alignItems: "center",
	},
	input:{
		width: "80%",
        borderColor: colors.gray,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
	}
	
});
export default styles
