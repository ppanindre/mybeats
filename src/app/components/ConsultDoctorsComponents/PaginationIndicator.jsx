import React from 'react';
import { View } from 'react-native';

const PaginationIndicator = ({ currentIndex, length }) => {
    return (
        <View className="flex-row justify-center items-center">
            {Array.from({ length }).map((_, index) => (
                <View
                    key={index}
                    className={`h-2 w-2 rounded-full mx-1 ${
                        currentIndex === index
                            ? "bg-primary"
                            : "bg-dark"
                    }`}
                    style={{ opacity: currentIndex === index ? 1 : 0.5 }}
                />
            ))}
        </View>
    );
};

export default PaginationIndicator;
