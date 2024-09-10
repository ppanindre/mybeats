import React, { useRef, useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import SliderCard from '../Cards/SliderCard';
import PaginationIndicator from '../PatientDashboardComponents/PaginationIndicator';
import { sliderCardData } from '../../../../constants/sliderCardData';

const Slider = () => {
    const sliderRef = useRef(null);
    const slideTimer = 5000;
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let interval;
        if (isAutoScroll) {
            interval = setInterval(() => {
                if (currentIndex < sliderCardData.length - 1) {
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
        <View className="space-y-4">
            <FlatList
                ref={sliderRef}
                data={sliderCardData}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SliderCard {...item} />}
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
            <View>
                <PaginationIndicator
                    currentIndex={currentIndex}
                    length={sliderCardData.length}
                />
            </View>
        </View>
    );
};

export default Slider;