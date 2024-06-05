import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { mybeatsStackConfig } from "./MybeatsStackConfig";

import { TouchableOpacity, View } from "react-native";
import { theme } from "../../../../tailwind.config";
import { useDispatch, useSelector } from "react-redux";
import { getPatientActionCreator } from "../../../../store/actions/patientActions";
import Loader from "../../components/Utils/Loader";
import FailureScreen from "../../components/Utils/FailureScreen";

const ICON_SIZE = 24;

const MybeatsStack = () => {
    const { loading, error, patient } = useSelector(
        (state) => state.patientGetReducer
    );

    const Stack = createStackNavigator();
    const dispatch = useDispatch();

    // Get patient when loading this screen
    useEffect(() => {
        dispatch(getPatientActionCreator());
    }, []);

    // When the reducer is loading
    if (loading) {
        return <Loader />;
    }

    // If the user did not save the profile
    if (error || !patient) {
        return <FailureScreen />;
    }

    return (
        <Stack.Navigator initialRouteName="patientDashboard">
            {mybeatsStackConfig.screens.map((screen) => (
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
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
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
            ))}
        </Stack.Navigator>
    );
};

export default MybeatsStack;
