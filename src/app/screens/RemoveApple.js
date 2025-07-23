import { View, Text, Alert } from "react-native";
import React from "react";
// import CustomSafeView from "../components/CustomSafeView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CheckIcon, ChevronLeftIcon } from "react-native-heroicons/solid";
// import CustomButton from "../components/CustomButton";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deviceQueries } from "../../../apis/deviceQueries";
import { mailQueries } from "../../../apis/mailQueries";
import { deviceActionTypes } from "../../../store/DeviceReducer/DeviceActionTypes";
import CustomSafeView from "../../../components/CustomSafeView";
import CustomButton from "../../../components/CustomButton";
// import { deviceQueries } from "../apis/deviceQueries";
// import { mailQueries } from "../apis/mailQueries";
// import { deviceActionTypes } from "../store/DeviceReducer/DeviceActionTypes";

const RemoveApple = () => {
  const categories = [
    "Active Energy",
    "Activity",
    "Beat-to-Beat Measurements",
    "Heart Rate",
    "Heart Rate Variability",
    "Sleep",
    "Steps",
  ];

  const { devicesData, deviceSelected } = useSelector(
    (state) => state.DeviceReducer
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const removeAppleDevice = async () => {
    const prevDeviceSelected = deviceSelected;
    const updatedDevicesData = devicesData.filter(
      (device) => device.deviceName !== deviceSelected
    ); // remove the device selected

    try {
      if (updatedDevicesData.length == 0) {
        await deviceQueries.removeDeviceFromFirebase(
          updatedDevicesData,
          prevDeviceSelected,
          null
        ); // remove device from firebase

        dispatch({
          type: deviceActionTypes.SET_DEVICES,
          payload: { updatedDevicesData, deviceSelected: null },
        }); // set device selected to be null if there are no devices
      } else {
        const randomIndex = Math.floor(
          Math.random() * updatedDevicesData.length
        );
        updatedDevicesData[randomIndex].isSelected = true; // get the next selected device

        // remove the selected device from firebase
        await deviceQueries.removeDeviceFromFirebase(
          updatedDevicesData,
          prevDeviceSelected,
          updatedDevicesData[randomIndex].deviceName
        );

        // remove the selected device
        dispatch({
          type: deviceActionTypes.SET_DEVICES,
          payload: {
            updatedDevicesData,
            deviceSelected: updatedDevicesData[randomIndex].deviceName,
          },
        });
        // alert the user device has been removed
      }
      Alert.alert("", "Your device has been removed");
      mailQueries.sendRemoveDeviceMail(auth().currentUser.uid);

      navigation.navigate("BottomTabNav");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CustomSafeView>
      {/* Header */}
      <View className="p-5 border-b-2 border-darkSecondary flex-row items-center gap-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="#000000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Manage Apple HealthKit Data</Text>
      </View>

      <View className="h-[90%] flex justify-between">
        <View>
          <View className="p-5">
            <Text className="text-lg">
              This app uses Apple HealthKit to read your following health data
              and provide health insights. You can always turn this off via
              Settings of Apple Health.
            </Text>
          </View>

          <View className="p-5 flex space-y-5">
            {categories.map((category, index) => (
              <View
                key={index}
                className="flex border-b border-darkSecondary pb-2 flex-row justify-between"
              >
                <Text className="text-lg font-bold">{category}</Text>
                <CheckIcon color="#fb923c" />
              </View>
            ))}
          </View>
        </View>

        <View className="p-5">
          <CustomButton
            onPress={removeAppleDevice}
            variant="primary"
            btnLabel="Remove Apple HealthKit Access"
          />
        </View>
      </View>
    </CustomSafeView>
  );
};

export default RemoveApple;
