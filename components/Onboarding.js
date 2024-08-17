import { View, Text, Image, FlatList, useWindowDimensions } from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "./CustomButton";
import { onboardingData } from "../constants/onboardingConstants";

const OnboardingItem = ({ item, selectedIndex }) => {
  
  // get phone width
  const { width } = useWindowDimensions(width);

  return (
    <View className="items-center justify-center py-4" style={{ width }}>
      
      {/* showcase images for the onboardin item */}
      <Image
        className="scale-110" // transform: scale(1.1)
        source={item.imgSource}
        style={{ flex: 0.7, resizeMode: "contain" }}
      />
      
      <View className="mt-5" style={{ flex: 0.5 }}>
        {/* Onboarding item content */}
        <Text style={{ maxWidth: 300 }} className="text-center text-lg">
          {item.content} 
        </Text>
      </View>

      <View className="flex-row" style={{ flex: 0.1 }}>
        {/* dots which indicate the screen */}
        <ScalingDot isSelected={selectedIndex === 0} />
        <ScalingDot isSelected={selectedIndex === 1} />
        <ScalingDot isSelected={selectedIndex === 2} />
      </View>
    </View>
  );
};

const ScalingDot = ({ isSelected }) => {
  return (
    <View
      className={`w-2 h-2 ${
        isSelected ? "bg-gray-400" : "bg-darkSecondary"
      } rounded-full mr-2`} // change color to dark gray if the item is on that screen
    ></View>
  );
};

const Onboarding = () => {

  // get phone width
  const { width } = useWindowDimensions();

  // define states
  const [selectedIndex, setSelectedIndex] = useState(0);

  // define flatlist ref
  const flatListRef = useRef(null);
  
  // define navigation instance
  const navigation = useNavigation();

  // function to handle scrolling the onboarding items
  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x; // get content offset based on the x axis
    const index = Math.floor(contentOffset / width); // get the item index
    setSelectedIndex(index); // set the index to be the selected onboarding item to show
  };

  // function to scroll the carouse
  const scrollCarousel = () => {
    const nextIndex = selectedIndex + 1; // get the index of the next item in the carousel
    
    // if the next index did not reach the index of the onboarding item, go to the next item
    if (nextIndex < onboardingData.length) { 
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
      setSelectedIndex(nextIndex);
    } else {
      // If it reaches the end, navigate to the next screen
      navigation.navigate("addDevice");
    }
  };

  return (
    <View sentry-label="onboarding">
      <View style={{ height: "80%" }}>

        {/* Flatlist to render the onboarding items */}
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={({ item }) => (
            <OnboardingItem item={item} selectedIndex={selectedIndex} /> // render the onboarding items
          )}
          showsHorizontalScrollIndicator={false}
          pagingEnabled // gives a sense of scrolling pages
          horizontal
          onScroll={handleScroll}
        />
      </View>

      {/* Next button */}
      <View className="px-10">
        <CustomButton
          sentry-label="onboarding-next-btn"
          variant="primary"
          btnLabel="Next"
          onPress={scrollCarousel}
        />
      </View>
    </View>
  );
};

export default Onboarding;
