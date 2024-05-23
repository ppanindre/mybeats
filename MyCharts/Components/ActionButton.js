import { View, Text, FlatList, TouchableOpacity, Linking, Modal } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { customTheme } from '../../constants/themeConstants';

const colors = {
    white: '#fff',
    PRIMARY: '#0165fc',
    SECONDARY: '#dbeafe',
    LIGHT_GRAY: '#e6e8eb',
    GRAY: '#a6a4a4',
  };
export default function ActionButton({ excludeId3 = false }) {
    const [callModalVisible, setCallModalVisible] = useState(false);
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);

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
            // action: () => setCallModalVisible(true),
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

    // Filter out the item based on the excludeId3 prop
    const visibleActions = excludeId3 ? actionButtonList.filter(item => item.id !== 3) : actionButtonList;


    const handlePress = (itemName) => {
        switch (itemName) {
            case 'Phone':
                const phoneNumber = '2222222222';
                Linking.openURL(`tel:${phoneNumber}`);
                break;
            case 'Video Call':
                setCallModalVisible(true);
                break;
            default:
                console.log('Action not supported');
                break;
        }
    };

    return (
        <View style={{ marginTop: 5, marginLeft:-10 }}>
            <FlatList
                data={visibleActions}
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                numColumns={5}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => item.action ? item.action() : handlePress(item.name)}>
                        <View
                            style={{
                                marginLeft: 10,
                                marginRight: 10,
                                backgroundColor: customTheme.colors.lightPrimary,
                                padding: 13,
                                borderRadius: 99,
                                alignItems: 'center',
                                width: 55,
                            }}>
                            <Ionicons name={item.icon} size={24} color={customTheme.colors.light} />
                        </View>
                        <Text
                            style={{
                                fontFamily: 'appfont-semi',
                                marginTop: 5,
                            }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />


            <Modal
                animationType="slide"
                transparent={false}
                visible={callModalVisible}
                onRequestClose={() => setCallModalVisible(false)}
            >
                <SafeAreaView style={styles.videoCallContainer}>
                    <View style={styles.videoFeed}>
                        {/* Placeholder for video feed */}
                    </View>

                    <View style={styles.controls}>
                        <TouchableOpacity style={[styles.button, cameraOn ? styles.buttonActive : styles.buttonInactive]} onPress={() => setCameraOn(!cameraOn)}>
                            {/* <Ionicons name={cameraOn ? 'camera' : 'camera-off'} size={30} color="white" /> */}
                            <MaterialCommunityIcons name={cameraOn ? 'camera' : 'camera-off'} size={30} color="white" />
                            <Text style={styles.buttonText}>Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, micOn ? styles.buttonActive : styles.buttonInactive]} onPress={() => setMicOn(!micOn)}>
                            <Ionicons name={micOn ? 'mic' : 'mic-off'} size={30} color="white" />
                            <Text style={styles.buttonText}>Mic</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.endCallButton} onPress={() => setCallModalVisible(false)}>
                            <Text style={styles.endCallText}>
                                <MaterialIcons name="call-end" size={24} color="white" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    videoCallContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    videoFeed: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#333',
    },
    button: {
        alignItems: 'center',
        padding: 10,
    },
    buttonActive: {
        borderRadius: 10,
    },
    buttonInactive: {
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        marginTop: 5,
    },
    endCallButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: -5,
    },
    endCallText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
