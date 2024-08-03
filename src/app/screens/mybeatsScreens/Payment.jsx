import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { CreditCardInput } from "react-native-credit-card-input";
import AppButton from "../../components/Buttons/AppButton";
import AddressCard from "../../../../components/Cards/AddressCard";
import { theme } from "../../../../tailwind.config";
import ScreenContainer from "../../components/Containers/ScreenContainer";

const Payment = () => {
    const navigation = useNavigation();

    return (

        <ScreenContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View className="relative h-[100%] space-y-6">
                    <View>
                        <View className="space-y-3">
                            <Text className="text-lg font-[appfont-bold]">
                                Payment Method
                            </Text>
                            <View className="bg-white rounded-lg shadow-lg space-y-2">
                                {/* UPI - GPAY - PhonePe - Paytm - QR */}
                                <View className="flex-row items-center justify-between">
                                    {Array(5)
                                        .fill(1)
                                        .map((_, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={{
                                                    borderColor:
                                                        theme.colors
                                                            .primary,
                                                }}
                                                className="border rounded-full p-2"
                                            >
                                                <Ionicons
                                                    name="cash-outline"
                                                    size={24}
                                                    color={
                                                        theme.colors
                                                            .primary
                                                    }
                                                />
                                            </TouchableOpacity>
                                        ))}
                                </View>

                                {/* Or section */}
                                <View className="flex-row items-center justify-center space-x-3">
                                    <View className="h-[1] flex-1" />
                                    <View>
                                        <Text
                                            style={{
                                                color: theme.colors.dark,
                                            }}
                                            className="font-[appfont]"
                                        >
                                            OR
                                        </Text>
                                    </View>
                                    <View className="h-[1] flex-1" />
                                </View>

                                {/* Credit Card input */}
                                <View>
                                    <CreditCardInput
                                        inputStyle={{
                                            backgroundColor:
                                                theme.colors
                                                    .darkSecondary,
                                            padding: 10,
                                            borderRadius: 10,
                                            fontFamily: "appfont",
                                        }}
                                        labelStyle={{
                                            fontFamily: "appfont-bold",
                                        }}
                                        inputContainerStyle={{
                                            borderWidth: 0,
                                            gap: 10,
                                        }}
                                        onChange={this._onChange}
                                        requiresName={true}
                                        requiresCVC={true}
                                        allowScroll={true}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="space-y-3">
                        <View>
                            <Text className="text-lg font-[appfont-semi]">
                                Billing Address
                            </Text>
                        </View>

                        <View>
                            <AddressCard onPress={() => navigation.navigate('confirmAddress')}
                                type="home"
                                address="W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite..."
                                phone="999 999 9999"
                            />
                        </View>
                    </View>

                    {/* Shipping Address */}
                    <View className="space-y-3">
                        <View>
                            <Text className="text-lg font-[appfont-semi]">
                                Shipping Address
                            </Text>
                        </View>

                        <View>
                            <AddressCard onPress={() => navigation.navigate('shippingAddress')}
                                type="home"
                                address="W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite..."
                                phone="999 999 9999"
                            />
                        </View>
                    </View>

                    
                        <View className="flex-1">
                            <AppButton
                                onPress={() => {}}
                                variant="primary"
                                btnLabel="Pay"
                                btnRightIcon={
                                    <View className="flex-row items-center">
                                        <FontAwesome
                                            name="rupee"
                                            size={15}
                                            color={theme.colors.light}
                                        />
                                        <Text className="ml-1 text-light font-[appfont-bold]">
                                            11220
                                        </Text>
                                    </View>
                                }
                            />
                        </View>
                    </View>
            </ScrollView>
        </ScreenContainer>
    );
};

export default Payment;
