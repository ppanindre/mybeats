import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Switch,
  } from "react-native";
  import React, { useState } from "react";
  import { Ionicons, FontAwesome } from "@expo/vector-icons";
  import LightButton from "../../../../components/Buttons/LightButton";
  import AddressCard from "../../../../components/Cards/AddressCard";
  import { useNavigation } from "@react-navigation/native";
  import TextInputBoxWithIcon from "../../../../components/Utilities/TextInputBoxWithIcon";
  import ScreenContainer from "../../components/Containers/ScreenContainer";
  import AppButton from "../../components/Buttons/AppButton";
  import { theme } from "../../../../tailwind.config";
  import ModalContainer from "../../components/Containers/ModalContainer";
  
  const addressData = [
    {
        id: "1",
        type: "home",
        address:
            "W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite...",
        phone: "999 999 9999",
    },
    {
        id: "2",
        type: "home",
        address:
            "W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite...",
        phone: "999 999 9999",
    },
    {
        id: "3",
        type: "home",
        address:
            "W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite...",
        phone: "999 999 9999",
    },
    {
        id: "4",
        type: "home",
        address:
            "W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite...",
        phone: "999 999 9999",
    },
    {
        id: "5",
        type: "home",
        address:
            "W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite...",
        phone: "999 999 9999",
    },
  ];
  
  const ShippingAddress = () => {
    const [selectedId, setSelectedId] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
  
    const selectAddress = (id) => {
        setSelectedId(id);
    };
  
    const onEdit = () => {
        setIsModalVisible(true);
    };
  
    const navigation = useNavigation();
  
    return (
        <ScreenContainer>
  
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Add address button */}
                <View>
                    <LightButton>
                        <Ionicons
                            name="add"
                            size={24}
                            color={theme.colors.primary}
                        />
                        <Text
                            style={{ color: theme.colors.primary }}
                            className="font-[appfont-bold]"
                        >
                            Add New Address
                        </Text>
                    </LightButton>
                </View>
                <View className="space-y-3">
                    {/* <Text className="font-[appfont-bold] text-lg">Billing Address</Text> */}
                    {/* Address Cards */}
                    {addressData.map((address) => (
                        <View key={address.id}>
                            <AddressCard
                                onPress={() => selectAddress(address.id)}
                                type={address.type}
                                address={address.address}
                                phone={address.phone}
                                isSelected={selectedId === address.id}
                                onEdit={onEdit}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
  
            <View>
                <AppButton
                    onPress={() => navigation.navigate("payment")}
                    variant='primary'
                    btnLabel='Confirm Shipping Address'
                />
            </View>
  
            <ModalContainer
                animationType="slide"
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            >
                <View className="flex-1 justify-end">
                    {/* This View centers the modal content */}
                    <View className=" p- shadow-md rounded-lg space-y-5">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-[appfont-semi]">
                                Edit Address
                            </Text>
                            <TouchableOpacity
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            </TouchableOpacity>
                        </View>
  
                        <View className="space-y-5">
                            <View className="h-[40]">
                                <TextInputBoxWithIcon placeholder="Address" />
                            </View>
                            <View className="h-[40]">
                                <TextInputBoxWithIcon placeholder="City" />
                            </View>
                            <View className="h-[40]">
                                <TextInputBoxWithIcon placeholder="State" />
                            </View>
                            <View className="h-[40]">
                                <TextInputBoxWithIcon placeholder="Landmark" />
                            </View>
                            <View className="h-[40]">
                                <TextInputBoxWithIcon placeholder="Phone Number" />
                            </View>
                            <View className="h-[40]">
                                <TextInputBoxWithIcon placeholder="Pincode" />
                            </View>
                        </View>
  
                        <View>
                            <AppButton
                            variant='primary'
                                btnLabel='Save Address'
                            />
                        </View>
                    </View>
                </View>
            </ModalContainer>
        </ScreenContainer>
    );
  };
  
  export default ShippingAddress;