import React, { Component, TouchableOpacity } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import DoctorRole from '../MyCharts/Screens/DoctorRole';
import { customTheme } from '../constants/themeConstants';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import LabManager from '../MyCharts/Screens/LabManager';
import CustomSafeView from '../components/CustomSafeView';
import TopNavbar from '../components/Utilities/TopNavbar';
import MychartsDashboard from '../MyCharts/Screens/mychartsDashboard';
import PharmacyManager from '../MyCharts/Screens/PharmacyManger';
import PatientRole from '../MyCharts/Screens/PatientRole';

const Stack = createStackNavigator();

export class RolesNav extends Component {
    render() {
        return (
            <CustomSafeView>
                <TopNavbar isMyBeats={true} showSync={false} />
                <Stack.Navigator initialRouteName={this.props.route.params?.screen || "MychartsDashboard"}>

                    {/* DoctorRole */}
                    <Stack.Screen
                        name="DoctorRole"
                        component={DoctorRole}
                        options={{
                            headerShown: false
                        }}
                    />
                    
                    {/* PatientRole */}
                    <Stack.Screen
                        name="MychartsDashboard"
                        component={MychartsDashboard}
                        options={{
                            headerShown: false
                        }}
                    />
                    
                    {/* Pharmacy Manager */}
                    <Stack.Screen
                        name="PharmacyManager"
                        component={PharmacyManager}
                        options={{
                            headerShown: false
                        }}
                    />

                    {/* Lab Manager */}
                    <Stack.Screen
                        name="LabManager"
                        component={LabManager}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </CustomSafeView>
        )
    }
}

export default RolesNav
