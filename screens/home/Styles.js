import { ScrollViewComponent, StyleSheet } from 'react-native'
import { colors } from '../../hooks/Colours';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems:"center"
	},
	scroll:{
		flex: 1,
		width:"100%",
	},
	scrollContainer: {
		flexDirection: 'column',
        justifyContent: 'space-around',
	},
	options:{
		flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
		borderWidth: 1,
		borderColor: colors.secondaryGrey,
        padding: 10,
		width: "90%",
		borderRadius: 5,
		height:100,
		marginBottom: 30,
	},
	recentText:{
		fontSize: 18,
        fontWeight: "bold",
		alignSelf:"flex-start",
		paddingLeft:16,
	}
	
});
export default styles
