import { StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
    logo :{
        justifyContent: "center",
        alignItems: "center",
        flex:0.2
    },
    innerContainer:{
        alignItems: "center",
        flex:0.8,
        backgroundColor: "white",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        marginTop:"auto",
        paddingTop:30
    },
	header: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
	},
	detailsContainer: {
		width: "100%",
		paddingHorizontal: 20,
	},
    details:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: colors.primaryGrey,
        padding: 10,

        borderRadius: 10,
    },
	text: {
		fontSize: 16,
		marginVertical: 5,
	},
	bold: {
		fontWeight: "bold",
        textAlign:"right",
        marginLeft:"auto"
	},
	separator: {
		width: "100%",
		borderBottomWidth: 1,
		borderColor: "#ccc",
		marginVertical: 10,
	},
	footer: {
		fontSize: 14,
		color: "#888",
		marginTop: 10,
	},

    
})
export default styles