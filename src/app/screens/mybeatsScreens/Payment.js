import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import CustomSafeView from "../../../../components/CustomSafeView";
import { customTheme } from "../../../../constants/themeConstants";
import { useNavigation } from "@react-navigation/native";
// import { CreditCardInput } from "react-native-credit-card-input"
import PrimaryButton from "../../../../components/Buttons/PrimaryButton";
import AddressCard from "../../../../components/Cards/AddressCard";

const Payment = () => {
    const navigation = useNavigation();

    return (
        <CustomSafeView>
            {/* Header */}
            <View className="px-4 py-2 border-b border-gray-300">
                <View className="flex-row items-center space-x-3">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons size={24} name="arrow-back" />
                    </TouchableOpacity>

                    {/* Header title */}
                    <View>
                        <Text className="text-xl font-[appfont-bold]">
                            Checkout
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="py-4 bg-gray-100 h-[100%]"
                contentContainerStyle={{ paddingBottom: 150 }}
            >
                <View className="relative h-[100%] space-y-3">
                    <View className="px-4">
                        <View className="space-y-3">
                            <Text className="text-lg font-[appfont-bold]">
                                Payment Method
                            </Text>
                            <View className="bg-white rounded-lg shadow-lg p-5 space-y-2">
                                {/* UPI - GPAY - PhonePe - Paytm - QR */}
                                <View className="flex-row items-center justify-between">
                                    {Array(5)
                                        .fill(1)
                                        .map((_, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={{
                                                    borderColor:
                                                        customTheme.colors
                                                            .primary,
                                                }}
                                                className="border rounded-full p-2"
                                            >
                                                <Ionicons
                                                    name="cash-outline"
                                                    size={24}
                                                    color={
                                                        customTheme.colors
                                                            .primary
                                                    }
                                                />
                                            </TouchableOpacity>
                                        ))}
                                </View>

                                {/* Or section */}
                                <View className="flex-row items-center justify-center space-x-3">
                                    <View className="h-[1] flex-1 bg-gray-300" />
                                    <View>
                                        <Text
                                            style={{
                                                color: customTheme.colors.dark,
                                            }}
                                            className="font-[appfont]"
                                        >
                                            OR
                                        </Text>
                                    </View>
                                    <View className="h-[1] flex-1 bg-gray-300" />
                                </View>

                                {/* Credit Card input */}
                                <View>
                                    {/* <CreditCardInput
                                        inputStyle={{
                                            backgroundColor:
                                                customTheme.colors
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
                                    /> */}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="px-4 space-y-3">
                        <View>
                            <Text className="text-lg font-[appfont-semi]">
                                Billing Address
                            </Text>
                        </View>

                        <View>
                            <AddressCard
                                type="home"
                                address="W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite..."
                                phone="999 999 9999"
                            />
                        </View>
                    </View>

                    {/* Shipping Address */}
                    <View className="px-4 space-y-3">
                        <View>
                            <Text className="text-lg font-[appfont-semi]">
                                Shipping Address
                            </Text>
                        </View>

                        <View>
                            <AddressCard
                                type="home"
                                address="W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite..."
                                phone="999 999 9999"
                            />
                        </View>
                    </View>

                    <View className="px-4 w-[100%] absolute bottom-[-80]">
                        <View>
                            <PrimaryButton
                                btnLabel={
                                    <View className="flex-row items-center justify-center">
                                        <Text className="text-white mr-2 font-[appfont-bold]">
                                            Pay
                                        </Text>
                                        <FontAwesome
                                            name="rupee"
                                            size={15}
                                            color={customTheme.colors.light}
                                        />
                                        <Text className="ml-1 text-white font-[appfont-bold]">
                                            11220
                                        </Text>
                                    </View>
                                }
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </CustomSafeView>
    );
};

export default Payment;
