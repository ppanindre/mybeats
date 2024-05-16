import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens

import BottomTabNavigator from "./BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Landing from "../screens/Landing";
import ProfileCreation from "../screens/ProfileCreation";
import AddAvatarForProfileCreation from "../screens/AddAvatarForProfileCreation";
import EditProfile from "../screens/EditProfile";
import AddAvatar from "../screens/AddAvatar";
import LoginOtp from "../screens/LoginOtp";
import EnterOtp from "../screens/EnterOtp";
import AddDevice from "../screens/AddDevice";
import FoodEditComponent from "../screens/firebeatsScreens/FoodEdit";
import SignInWithGfit from "../screens/SignInWithGfit";
import SignInWithGarmin from "../screens/SignInWithGarmin";
import WelcomeScreens from "../screens/WelcomeScreens";
import DeleteUser from "../screens/DeleteUser";
import Survey from "../screens/Survey";
import Feedback from "../screens/Feedback";
import TermsOfService from "../screens/TermsOfService";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import Profile from "../screens/Profile";

// Create a Stack for the stack navigator
const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Initial Screen */}
                <Stack.Screen name="landing" component={Landing} />

                <Stack.Screen
                    name="profileCreation"
                    component={ProfileCreation}
                    options={{ gestureEnabled: false }} // gestureEnabled to False to prevent user to go back from the screen using native
                />
                <Stack.Screen
                    name="addAvatarForProfileCreation"
                    component={AddAvatarForProfileCreation}
                />
                <Stack.Screen name="editProfile" component={EditProfile} />
                <Stack.Screen name="addAvatar" component={AddAvatar} />
                <Stack.Screen name="loginOtp" component={LoginOtp} />
                <Stack.Screen name="enterOtp" component={EnterOtp} />
                <Stack.Screen name="addDevice" component={AddDevice} />
                <Stack.Screen name="foodedit" component={FoodEditComponent} />
                <Stack.Screen
                    name="signInWithGfit"
                    component={SignInWithGfit}
                />
                <Stack.Screen
                    name="signInWithGarmin"
                    component={SignInWithGarmin}
                />
                <Stack.Screen name="welcome" component={WelcomeScreens} />
                <Stack.Screen name="deleteUser" component={DeleteUser} />
                <Stack.Screen name="survey" component={Survey} />
                <Stack.Screen name="feedback" component={Feedback} />
                <Stack.Screen
                    name="termsOfService"
                    component={TermsOfService}
                />
                <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} />
                <Stack.Screen name="profile" component={Profile} />

                {/* Bottom Navigation Tabs. It is common across the application */}
                <Stack.Screen
                    component={BottomTabNavigator}
                    name="BottomTabNav"
                    options={{ gestureEnabled: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainStack;
