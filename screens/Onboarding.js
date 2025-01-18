import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../hooks/Colours";
import Footer from "../components/Footer";
import Slides from "../hooks/Slides";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("screen");

const Onboarding = ({navigation} ) => {
	const [currentId, setCurrentId] = useState(0);
	const Ref = useRef(null);

	const updateIndex = (e) => {
		const offsetX = e.nativeEvent.contentOffset.x;
		const currentIndex = Math.round(offsetX / width);
		console.log("current page", currentIndex);
		setCurrentId(currentIndex);
	};
	const next = () => {
		const nextSlide = currentId + 1;
		if (nextSlide !== Slides.length) {
			const offset = nextSlide * width;
			Ref?.current?.scrollToOffset({ offset });
			setCurrentId(nextSlide);
		}
	};
	const NavigateToApp = () => {
		navigation.navigate("AuthOption");
	};
	const skip = () => {
		const lastSlide = Slides.length - 1;
		const offset = lastSlide * width;
		Ref?.current?.scrollToOffset({ offset });
		setCurrentId(lastSlide);
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				onMomentumScrollEnd={updateIndex}
				ref={Ref}
				data={Slides}
				horizontal
				showsHorizontalScrollIndicator={false}
				bounces={false}
				pagingEnabled
				renderItem={({ item }) => {
					return (
						<View key={item?.id} style={styles.page}>
							<View style={[styles.imagery]}>{item?.images}</View>
							<View style={styles.texts}>
								<Text style={styles.head}>{item.heading}</Text>
								<Text style={styles.subHead}>{item.subHeading}</Text>
							</View>
							<Footer
								Slides={Slides}
								next={next}
								NavigateToApp={NavigateToApp}
								currentId={currentId}
								skip={skip}
							/>
						</View>
					);
				}}
			/>
		</SafeAreaView>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	page: {
		backgroundColor: "white",
		width: width,
		height: height,
		alignItems: "center",
	},
	imagery: {
		width: width - 10,
		height: height * 0.5,
		justifyContent: "center",
		alignItems: "center",
	},
	texts: {
		height: height * 0.18,
		alignItems: "center",
		justifyContent: "center",
	},
	head: {
		fontSize: 32,
		fontWeight: "700",
		color: colors.primary,
		paddingHorizontal: 30,
		textAlign: "center",
	},
	subHead: {
		width: width - 50,
		fontSize: 14,
		fontWeight: "400",
		color: colors.greyText,
		marginTop: 10,
		textAlign: "center",
		paddingHorizontal: 30,
	},
});
