import {
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../hooks/Colours";

const InputContainer = ({
	text,
	placeholder,
	password,
	onChangeText,
	value,
	editable,
	submit,
	multiline
}) => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [focus, setFocus] = useState(false);
	const toggleFocus = () => {
		setFocus(true);
	};
	const toggleBlur = () => {
		setFocus(false);
	};
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
			<View style={[styles.inputCont, focus && styles.focus]} focusable>
				<TextInput
					secureTextEntry={password && !passwordVisible}
					placeholder={placeholder}
					placeholderTextColor={colors.greyTex}
					onFocus={() => toggleFocus()}
					onBlur={() => toggleBlur()}
					cursorColor={"black"}
					onChangeText={onChangeText}
					style={styles.input}
					value={value}
					editable={editable}
					onSubmitEditing={submit}
					multiline={multiline}
				/>
				{password &&
					(passwordVisible ? (
						<TouchableOpacity onPress={() => togglePasswordVisibility()}>
							<Ionicons
								name="eye"
								size={24}
								color={colors.greyText}
								style={{ marginRight: 16 }}
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={() => togglePasswordVisibility()}>
							<Ionicons
								name="eye-off"
								size={24}
								color={colors.greyText}
								style={{ marginRight: 16 }}
							/>
						</TouchableOpacity>
					))}
			</View>
		</View>
	);
};

export default InputContainer;

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	inputCont: {
		width: "100%",
		minHeight: 48,
		borderRadius: 8,
		marginTop: 8,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderColor: colors.primaryGrey,
		borderWidth: 0.5,
	},
	input: {
		height: "100%",
		paddingHorizontal: 16,
		fontSize: 16,
		flex: 1,
		marginVertical:10
	},
	text: {
		fontSize: 16,
	},
	focus: {
		borderColor: colors.primary,
		borderWidth: 0.5,
		backgroundColor: colors.secondaryGrey,
	},
});
