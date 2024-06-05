import { View, Text } from "react-native";
import React from "react";
import TopNavbar from "./TopNavbar";
import CustomSafeView from "../../../../components/CustomSafeView";

const FailureScreen = () => {
    return (
        <CustomSafeView>
            <TopNavbar showSync={false} isMyBeats={true} />
            <View className="h-[100%] items-center justify-center bg-light">
                <Text className="font-[appfont-bold] text-lg">
                    Please save your profile data
                </Text>
            </View>
        </CustomSafeView>
    );
};

export default FailureScreen;
