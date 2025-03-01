import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../hooks/Colours";
import Footer from "../../components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import {Slides} from "../../hooks/Slides";
const { width, height } = Dimensions.get("screen");

const Onboarding = ({ navigation }) => {

	// checking the current id of flatlist page
	const [currentId, setCurrentId] = useState(0);

	// useRef hook to hold the flatlist ref
	const Ref = useRef(null);

	// function to update the current id of the flatlist page
	const updateIndex = (e) => {
		const offsetX = e.nativeEvent.contentOffset.x;
		const currentIndex = Math.round(offsetX / width);
		setCurrentId(currentIndex);
	};

	// function to move to the next page of the flatlist
	const next = () => {
		const nextSlide = currentId + 1;
		if (nextSlide !== Slides.length) {
			const offset = nextSlide * width;
			Ref?.current?.scrollToOffset({ offset });
			setCurrentId(nextSlide);
		}
	};

	// function to move to the last page of the flatlist (skip)
	const skip = () => {
		const lastSlide = Slides.length - 1;
		const offset = lastSlide * width;
		Ref?.current?.scrollToOffset({ offset });
		setCurrentId(lastSlide);
	};

	// function to navigate to the app after completing the onboarding
	const NavigateToApp = () => {
		navigation.navigate("AuthStack", {
			screen: "AuthOption",
		});
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
						</View>
					);
				}}
			/>
			{/* footer aspect of the onboarding pages */}
			<Footer
				Slides={Slides}
				next={next}
				NavigateToApp={NavigateToApp}
				currentId={currentId}
				skip={skip}
			/>
		</SafeAreaView>
	);
};

export default Onboarding;
