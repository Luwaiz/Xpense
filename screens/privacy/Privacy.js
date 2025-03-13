import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styles from "./Styles";

const Privacy = () => {
	return (
		<View style={styles.container}>
			<Text>
				**Privacy Policy** Effective Date: [Insert Date] Thank you for using
				Xpense! Your privacy is important to us. This Privacy Policy explains
				how we collect, use, disclose, and protect your personal information
				when you use our mobile application. ### 1. Information We Collect ####
				a. Information You Provide - When you create an account, we collect your
				name, email address, and other necessary details. - Any expenses,
				budgets, and financial data you input into the app. #### b.
				Automatically Collected Information - Device information such as model,
				operating system, and app usage analytics. - Log data including IP
				address, timestamps, and error reports. - Firebase Cloud Messaging (FCM)
				tokens for notifications (if enabled). ### 2. How We Use Your
				Information We use the collected data to: - Provide and improve our
				app's features. - Securely store and sync your expense data. - Send you
				relevant notifications (with your consent). - Analyze app performance
				and troubleshoot issues. ### 3. Sharing and Disclosure We do **not**
				sell your personal data. However, we may share it in the following
				cases: - With trusted third-party services (such as Firebase) that help
				us operate the app. - When required by law or to protect against fraud
				and security threats. ### 4. Data Security We implement security
				measures to protect your data, including encryption and secure
				authentication. However, no system is 100% secure, and we cannot
				guarantee absolute security. ### 5. Your Choices & Rights - You can
				update or delete your data within the app settings. - You can opt out of
				notifications at any time. - You may request data deletion by contacting
				us at [Insert Contact Email]. ### 6. Changes to This Policy We may
				update this Privacy Policy from time to time. Any changes will be posted
				in the app, and we encourage you to review the policy periodically. ###
				7. Contact Us If you have any questions about this Privacy Policy,
				please contact us at [Insert Contact Email]. By using Xpense, you agree
				to this Privacy Policy.
			</Text>
		</View>
	);
};

export default Privacy;
