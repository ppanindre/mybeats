import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ScreenContainer from '../Containers/ScreenContainer';
import NavigationCard from '../../../../components/Cards/NavigationCard';

const HealthTracking = () => {
    return (
        <ScreenContainer>
            <View className="flex-row justify-around space-x-5">
                {/* First Card: Summary */}
                <View className="flex-1">
                    <NavigationCard
                        cardTitle="Summary"
                        onPress={() =>
                            ""
                        }
                    />
                </View>

                <View className="flex-1">
                    {/* Second Card: Heart rates */}
                    <NavigationCard
                        cardTitle="Heart Rates"
                        onPress={() =>
                            ""
                        }
                    />
                </View>
            </View>

            <View className="flex-row justify-around space-x-5">
                {/* Third Card: Activity */}
                <View className="flex-1">
                    <NavigationCard
                        cardTitle="Activity"
                        onPress={() =>
                            ""
                        }
                    />
                </View>

                <View className="flex-1">
                    {/* Fourth Card: Sleep */}
                    <NavigationCard
                        cardTitle="Sleep"
                        onPress={() =>
                           ""
                        }
                    />
                </View>
            </View>
        </ScreenContainer>
    )
};

export default HealthTracking
