import { StyleSheet } from "react-native";
import { colors } from "../../hooks/Colours";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		paddingHorizontal: 16,
        alignItems: "center",
    
	},
    text:{
        fontSize: 18,
        fontWeight: "semibold",
        color: "white",
        marginTop: 40,
    },
    input:{
        width: "100%",
        height: 50,
        backgroundColor: "#F1F1F1",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
    }
});
export default styles;
