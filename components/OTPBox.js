import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { colors } from "../hooks/Colours";

const OTPBox = ({ length = 6, onComplete }) => {
	const [otp, setOtp] = useState(new Array(length).fill(""));
	const [activeIndex, setActiveIndex] = useState(-1);
	const inputRefs = useRef([]);

	const handleChange = (text, index) => {
		if (text.length > 1) return; // Prevent pasting multiple characters
		const newOtp = [...otp];
		newOtp[index] = text;
		setOtp(newOtp);

		// Move to next input if a digit is entered
		if (text && index < length - 1) {
			inputRefs.current[index + 1].focus();
			setActiveIndex(index + 1);
		}

		// Call onComplete if all fields are filled
		if (newOtp.every((digit) => digit !== "")) {
			onComplete?.(newOtp.join(""));
		}
	};

	const handleKeyPress = (e, index) => {
		if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1].focus();
			setActiveIndex(index - 1);
		}
	};

	return (
		<View style={styles.container}>
			{otp.map((digit, index) => (
				<TextInput
					key={index}
					ref={(el) => (inputRefs.current[index] = el)}
					style={[styles.inputBox, index === activeIndex && styles.activeInput]}
					keyboardType="numeric"
					maxLength={1}
					value={digit}
					onChangeText={(text) => handleChange(text, index)}
					onKeyPress={(e) => handleKeyPress(e, index)}
					onFocus={() => setActiveIndex(index)}
				/>
			))}
		</View>
	);
};

export default OTPBox;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	inputBox: {
		width: 50,
		height: 60,
		margin: 5,
		borderWidth: 1,
		borderRadius: 8,
		textAlign: "center",
		fontSize: 20,
		borderColor: colors.primaryGrey,
	},
	activeInput: {
		borderColor: colors.primary, // Change border color when active
		borderWidth: 1.5,
	},
});
