import { View, Text, FlatList, TouchableOpacity, Linking, Modal, SafeAreaView, StyleSheet, Share } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../../tailwind.config';

export default function ActionButton({ excludeId2 = false, doctor }) {

    const actionButtonList = [
        {
            id: "1",
            name: 'Message',
            icon: 'chatbubble-ellipses',
        },
        {
            id: "2",
            name: 'Phone',
            icon: 'call',
        },
        {
            id: "3",
            name: 'Payment',
            icon: 'cash',
        },
        {
            id: "4",
            name: 'Share',
            icon: 'share',
        },
        {
            id: "5",
            name: 'Website',
            icon: 'earth',
        },
    ];

    // Filtering out the item based on website validity
    const visibleActions = actionButtonList.filter(item => {
        if (excludeId2 && item.id === "2") {
            return false;
        }
        if (item.name === 'Website' && (!doctor.website || doctor.website.trim().length === 0)) {
            return false;
        }
        return true;
    });

    // Universal Link that can be shared
    const universalLink = `mybeats://doctor/${doctor.doctorID}`;

    const handlePress = async (itemName) => {
        switch (itemName) {
            case 'Phone':
                Linking.openURL(`tel:${phoneNumber}`);
                break;
            case 'Website':
                Linking.openURL(doctor.website);
                break;
            case 'Share':
                const shareMessage = `Check out this doctor on our app: ${universalLink}`;
                try {
                    const result = await Share.share({
                        message: shareMessage,
                    });
                    if (result.action === Share.sharedAction) {
                        if (result.activityType) {
                            // Shared with activity type of result.activityType
                        } else {
                            // Shared
                        }
                    } else if (result.action === Share.dismissedAction) {
                        // Dismissed
                    }
                } catch (error) {
                    console.error("Error sharing the app link:", error);
                }
                break;
            default:
                console.log('Action not supported');
                break;
        }
    };

    return (
        <View>
            <FlatList
                data={visibleActions}
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                numColumns={5}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => item.action ? item.action() : handlePress(item.name)}>
                        <View className="space-y-2 items-center">
                            <View className="bg-lightPrimary w-[51] py-3 items-center rounded-3xl">
                                <Ionicons name={item.icon} size={24} color={theme.colors.light} />
                            </View>
                            <Text className="font-[appfont-semi]">
                                {item.name}
                            </Text>
                        </View>

                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
