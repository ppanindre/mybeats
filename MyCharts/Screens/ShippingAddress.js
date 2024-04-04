import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import CustomSafeView from "../../components/CustomSafeView";
import LightButton from "../../components/Buttons/LightButton";
import { customTheme } from "../../constants/themeConstants";
import AddressCard from "../../components/Cards/AddressCard";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
// import { Checkbox } from "react-native-paper";
import TextInputBoxWithIcon from "../../components/Utilities/TextInputBoxWithIcon";
import { Checkbox } from "react-native-paper";
// import CheckBox from "@react-native-community/checkbox";

const addressData = [
  {
      id: 1,
      type: "home",
      address:
          "W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite...",
      phone: "999 999 9999",
  },
  {
      id: 2,
      type: "home",
      address:
          "W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite...",
      phone: "999 999 9999",
  },
  {
      id: 3,
      type: "home",
      address:
          "W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite...",
      phone: "999 999 9999",
  },
  {
      id: 4,
      type: "home",
      address:
          "W3-092 9th Floor, Welington Estate, Near DLF Phase 5 Club, Opposite...",
      phone: "999 999 9999",
  },
  {
      id: 5,
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
                          Shipping Address
                      </Text>
                  </View>
              </View>
          </View>

          <ScrollView
              contentContainerStyle={{ paddingBottom: 50 }}
              className="h-[100%] bg-gray-100 py-5 space-y-4"
          >
              {/* Add address button */}
              <View className="px-4">
                  <LightButton>
                      <Ionicons
                          name="add"
                          size={24}
                          color={customTheme.colors.primary}
                      />
                      <Text
                          style={{ color: customTheme.colors.primary }}
                          className="font-[appfont-bold]"
                      >
                          Add New Address
                      </Text>
                  </LightButton>
              </View>
              <View className="px-4 space-y-3">
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

          <View className="px-4 bg-gray-100 py-5">
              <PrimaryButton
                  onPress={() => navigation.navigate("payment")}
                  btnLabel={
                      <Text className="text-white font-[appfont-bold]">
                          Confirm Shipping Address{" "}
                      </Text>
                  }
              />
          </View>

          <Modal
              animationType="slide"
              visible={isModalVisible}
              transparent={true}
          >
              <View className="flex-1 justify-end">
                  <View className="h-[70%] flex-1 bg-black opacity-40"></View>
                  {/* This View centers the modal content */}
                  <View className="w-[100%] h-[60%] p-5 shadow-xl bg-gray-100 rounded-lg space-y-3">
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
                                  color={customTheme.colors.primary}
                              />
                          </TouchableOpacity>
                      </View>

                      <View className="space-y-3">
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
                          <PrimaryButton
                              btnLabel={
                                  <Text className="text-white font-[appfont-semi]">
                                      Save Address
                                  </Text>
                              }
                          />
                      </View>
                  </View>
              </View>
          </Modal>
      </CustomSafeView>
  );
};

export default ShippingAddress;
