import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import BottomTabNav from "./BottomTabNav";
import Landing from "../screens/Landing";
import Profile from "../screens/Profile";
import AddDevice from "../screens/AddDevice";
import FoodEditComponent from "../screens/FoodEdit";
import SignInWithGfit from "../components/SignInWithGfit";
import NewSurvey from "../screens/NewSurvey";
import Feedback from "../screens/Feedback";
import SignInWithGarmin from "../components/SignInWithGarmin";
import TermsOfService from "../screens/TermsOfService";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import ProfileCreation from "../screens/ProfileCreation";
import EditProfile from "../screens/EditProfile";
import AddAvatar from "../screens/AddAvatar";
import AddAvatarForProfileCreation from "../screens/AddAvatarForProfileCreation";
import WelcomeScreens from "../screens/WelcomeScreens";
import LoginOtp from "../screens/LoginOtp";
import EnterOtp from "../screens/EnterOtp";
import DeleteUser from "../screens/DeleteUser";
import AppointmentScreen from "../MyCharts/Screens/AppointmentScreen"

// Create a root for the stack navigator
const Root = createStackNavigator();

const Router = () => {
  return (
    // Navigation Container
    <NavigationContainer>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        {/* Initial Screen */}
        <Root.Screen name="landing" component={Landing} />

        <Root.Screen
          name="profileCreation"
          component={ProfileCreation}
          options={{ gestureEnabled: false }} // gestureEnabled to False to prevent user to go back from the screen using native
        />
        <Root.Screen
          name="addAvatarForProfileCreation"
          component={AddAvatarForProfileCreation}
        />
        <Root.Screen name="editProfile" component={EditProfile} />
        <Root.Screen name="addAvatar" component={AddAvatar} />
        <Root.Screen name="loginOtp" component={LoginOtp} />
        <Root.Screen name="enterOtp" component={EnterOtp} />
        <Root.Screen name="addDevice" component={AddDevice} />
        <Root.Screen name="foodedit" component={FoodEditComponent} />
        <Root.Screen name="signInWithGfit" component={SignInWithGfit} />
        <Root.Screen name="signInWithGarmin" component={SignInWithGarmin} />
        <Root.Screen name="welcome" component={WelcomeScreens} />
        <Root.Screen name="deleteUser" component={DeleteUser} />

        <Root.Screen name="survey" component={NewSurvey} />
        <Root.Screen name="feedback" component={Feedback} />
        <Root.Screen name="termsOfService" component={TermsOfService} />
        <Root.Screen name="privacyPolicy" component={PrivacyPolicy} />

        <Root.Screen name="profile" component={Profile} />


        {/* MyCharts Screens */}
        {/* <Root.Screen name="appointments" component={AppointmentScreen} /> */}


        {/* Bottom Navigation Tabs. It is common across the application */}
        <Root.Screen
          component={BottomTabNav}
          name="BottomTabNav"
          options={{ gestureEnabled: false }}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;
