import { View, Text, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const ScrollableList = ({cardData, }) => {
  const sliderRef = useRef(null);
  const slideTimer = 5000;
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isAutoScroll) {
        interval = setInterval(() => {
            if (currentIndex < cardData.length - 1) {
                setCurrentIndex(currentIndex + 1);
                sliderRef.current.scrollToIndex({
                    index: currentIndex + 1,
                });
            } else {
                setCurrentIndex(0);
                sliderRef.current.scrollToIndex({ index: 0 });
            }
        }, slideTimer);
    }

    return () => {
        if (interval) {
            clearInterval(interval);
        }
    };
}, [currentIndex, isAutoScroll]);
  
  return (
        <View>
            <FlatList
                ref={sliderRef}
                data={cardData}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Card {...item} />}
                onScroll={({ nativeEvent }) => {
                    const slide = Math.ceil(
                        nativeEvent.contentOffset.x /
                            nativeEvent.layoutMeasurement.width
                    );
                    if (slide !== currentIndex) {
                        setCurrentIndex(slide);
                    }
                }}
            />
            {/* <PaginationIndicator
                    currentIndex={currentIndex}
                    length={cardData.length}
                /> */}
        </View>
    );
};

export default ScrollableList;
