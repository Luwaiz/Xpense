import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../hooks/Colours";

const InActiveButton = ({ text, onPress,width }) => {
    
    return (
        <TouchableOpacity style={[styles.box,{width}]} onPress={onPress}>
            <Text style={{ color: colors.primary }}>{text}</Text>
        </TouchableOpacity>
    );
};

export default InActiveButton;

const styles = StyleSheet.create({
    box: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        height:50,
        borderColor: colors.primary,
        borderWidth: 1,
    },
});
