import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { mybeatsStackConfig } from "./MybeatsStackConfig";

import { TouchableOpacity, View } from "react-native";
import { theme } from "../../../../tailwind.config";

const ICON_SIZE = 24;

const MybeatsStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="doctorDashboard">
            {mybeatsStackConfig.screens.map((screen) => {
                console.log(screen.name, screen.showHeader);
                return (
                    <Stack.Screen
                        name={screen.name}
                        component={screen.component}
                        options={({ navigation }) => ({
                            headerShown: screen.showHeader,
                            headerTitle: screen.headerTitle,
                            headerTitleAlign: "left",
                            headerStyle: {
                                height: 120,
                            },
                            headerLeft: () => (
                                <View className="ml-5">
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Ionicons
                                            name="arrow-back"
                                            size={ICON_SIZE}
                                            color={theme.colors.dark}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ),
                            headerRight: () => <View></View>,
                        })}
                    />
                );
            })}
        </Stack.Navigator>
    );
};

export default MybeatsStack;
