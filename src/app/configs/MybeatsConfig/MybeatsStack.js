import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { customTheme } from "../../../../constants/themeConstants";
import ConsultDoctor from "../../../../MyCharts/Screens/ConsultDoctor";
import Diagnostics from "../../../../MyCharts/Screens/Diagnostics";
import SearchDoctors from "../../../../MyCharts/Screens/SearchDoctors";
import AppointmentPage from "../../../../MyCharts/Screens/AppointmentPage";
import CartScreen from "../../../../MyCharts/Screens/CartScreen";
import Payment from "../../../../MyCharts/Screens/Payment";
import SearchMedicines from "../../../../MyCharts/Screens/SearchMedicines";
import UploadPrescription from "../../../../MyCharts/Screens/UploadPrescription";
import ConfirmAddress from "../../../../MyCharts/Screens/ConfirmAddress";
import ImageAnalyzeDisplay from "../../../../MyCharts/Components/ImageAnalyzeDisplay";
import EditAddress from "../../../../MyCharts/Screens/EditAddress";
import ShippingAddress from "../../../../MyCharts/Screens/ShippingAddress";
import PharmacyInfo from "../../../../MyCharts/Screens/PharmacyInfo";
import LabInfo from "../../../../MyCharts/Screens/LabInfo";
import Medicines from "../../../../MyCharts/Screens/Medicines";
import DoctorDashboard from "../../../../MyCharts/Screens/DoctorDashboard";
import AppointmentList from "../../../../MyCharts/Screens/AppointmentList";
import Patients from "../../../../MyCharts/Screens/Patients";
import PatientInfo from "../../../../MyCharts/Screens/PatientInfo";
import DoctorPrescription from "../../../../MyCharts/Screens/DoctorPrescription";
import DoctorAvailability from "../../../../MyCharts/Screens/DoctorAvailability";
import RolesNav from "./RolesNav";
import DoctorProfile from "../../../../MyCharts/Screens/DoctorProfile";
import DoctorMedicine from "../../../../MyCharts/Screens/DoctorMedicine";

// Declare icon size
const ICON_SIZE = 24;

// Declare Icons
const icons = {
    // Search Icon
    searchIcon: (
        <Ionicons
            name="search-outline"
            size={ICON_SIZE}
            color={customTheme.colors.dark}
        />
    ),

    // Cart Icon
    cartIcon: (
        <Ionicons
            name="cart-outline"
            size={ICON_SIZE}
            color={customTheme.colors.dark}
        />
    ),

    //Star Icon
    starIcon: (
        <Ionicons
            name="star-outline"
            size={ICON_SIZE}
            color={customTheme.colors.dark}
        />
    ),
};

// Go Back Button
const GoBackButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Ionicons
            name="arrow-back"
            size={ICON_SIZE}
            color={customTheme.colors.dark}
        />
    </TouchableOpacity>
);

// Right Icon Button
const RightIconButton = ({ icon, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        {/* Icon in right icon button */}
        {icon}
    </TouchableOpacity>
);

const MybeatsStack = () => {
    // Define Stack Navigator
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Rolesnav">
            {/* Initial Route */}
            <Stack.Screen
                name="RolesNav"
                component={RolesNav}
                options={{
                    headerShown: false,
                }}
            />

            {/* Consult Doctors */}
            <Stack.Screen
                name="consultdoctors"
                component={ConsultDoctor}
                options={({ navigation }) => ({
                    headerTitle: "Consult Doctors",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerRight: () => (
                        <View className="mr-4">
                            <RightIconButton
                                onPress={() => { }}
                                icon={icons.searchIcon}
                            />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            {/* Diagnostics */}
            <Stack.Screen
                name="diagnostics"
                component={Diagnostics}
                options={({ navigation }) => ({
                    headerTitle: "Diagnostics",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerRight: () => (
                        <View className="flex-row mr-4 space-x-4">
                            <View>
                                <RightIconButton icon={icons.searchIcon} />
                            </View>
                            <View>
                                <RightIconButton icon={icons.cartIcon} />
                            </View>
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            {/* Medicines */}
            <Stack.Screen
                name="medicines"
                component={Medicines}
                options={({ navigation }) => ({
                    headerTitle: "Medicines",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerRight: () => (
                        <View className="flex-row mr-4 space-x-4">
                            <TouchableOpacity>
                                <RightIconButton
                                    onPress={() =>
                                        navigation.navigate("CartScreen")
                                    }
                                    icon={icons.cartIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            {/* Search Doctors */}
            <Stack.Screen
                name="searchDoctors"
                component={SearchDoctors}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="searchMedicines"
                component={SearchMedicines}
                options={{ headerShown: false }}
            />

            {/* AppointmentPage */}
            <Stack.Screen
                name="AppointmentPage"
                component={AppointmentPage}
                options={({ navigation }) => ({
                    headerTitle: "Appointment",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerRight: () => (
                        <View className="mr-4">
                            <RightIconButton
                                onPress={() => { }}
                                icon={icons.starIcon}
                            />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                    headerStyle: {
                        backgroundColor: "#F1F1F1",
                    },
                })}
            />

            {/* Pharmacy Page */}
            <Stack.Screen
                name="PharmacyInfo"
                component={PharmacyInfo}
                options={({ navigation }) => ({
                    headerTitle: "Pharmacy",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerRight: () => (
                        <View className="mr-4">
                            <RightIconButton
                                onPress={() => { }}
                                icon={icons.starIcon}
                            />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                    headerStyle: {
                        backgroundColor: "#F1F1F1",
                    },
                })}
            />

            {/* Lab Info Page */}
            <Stack.Screen
                name="LabInfo"
                component={LabInfo}
                options={({ navigation }) => ({
                    headerTitle: "Lab",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerRight: () => (
                        <View className="mr-4">
                            <RightIconButton
                                onPress={() => { }}
                                icon={icons.starIcon}
                            />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                    headerStyle: {
                        backgroundColor: "#F1F1F1",
                    },
                })}
            />

            <Stack.Screen
                name="confirmAddress"
                component={ConfirmAddress}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={({ navigation }) => ({
                    headerTitle: "My Cart",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            <Stack.Screen
                name="UploadPrescription"
                component={UploadPrescription}
                options={({ navigation }) => ({
                    headerTitle: "Upload Prescription",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            <Stack.Screen
                name="payment"
                component={Payment}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ImageAnalyzeDisplay"
                component={ImageAnalyzeDisplay}
                options={({ navigation }) => ({
                    headerTitle: "Upload Prescription",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            <Stack.Screen
                name="AppointmentList"
                component={AppointmentList}
                options={({ navigation }) => ({
                    headerTitle: "Appointments",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            <Stack.Screen
                name="Patients"
                component={Patients}
                options={({ navigation }) => ({
                    headerTitle: "Patients",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            <Stack.Screen
                name="PatientInfo"
                component={PatientInfo}
                options={({ navigation }) => ({
                    headerTitle: "Patient Info",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            <Stack.Screen
                name="DoctorPrescription"
                component={DoctorPrescription}
                options={({ navigation }) => ({
                    headerTitle: "Prescription",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            <Stack.Screen
                name="DoctorAvailability"
                component={DoctorAvailability}
                options={({ navigation }) => ({
                    headerTitle: "Availability",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            <Stack.Screen
                name="shippingAddress"
                component={ShippingAddress}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="doctorDashboard" component={DoctorDashboard} />

            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen
                    name="editAddress"
                    component={EditAddress}
                    options={{ headerShown: false }}
                />
            </Stack.Group>

            <Stack.Screen
                name="DoctorProfile"
                component={DoctorProfile}
                options={({ navigation }) => ({
                    headerTitle: "Your Profile",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

            <Stack.Screen
                name="DoctorMedicine"
                component={DoctorMedicine}
                options={({ navigation }) => ({
                    headerTitle: "Analysed Medicines",
                    headerTitleAlign: "left",
                    headerLeft: () => (
                        <View className="ml-4">
                            <GoBackButton onPress={() => navigation.goBack()} />
                        </View>
                    ),
                    headerTitleStyle: {
                        fontFamily: "appfont-bold",
                        fontSize: customTheme.text.header,
                    },
                })}
            />

        </Stack.Navigator>
    );
};

export default MybeatsStack;
