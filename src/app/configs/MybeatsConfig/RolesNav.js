import React, { Component, TouchableOpacity } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import DoctorRole from '../../screens/mybeatsScreens/DoctorRole';
import LabManager from '../../screens/mybeatsScreens/LabManager';
import CustomSafeView from '../../../../components/CustomSafeView';
import TopNavbar from '../../../../components/Utilities/TopNavbar';
import MychartsDashboard from '../../screens/mybeatsScreens/mychartsDashboard';
import PharmacyManager from '../../screens/mybeatsScreens/PharmacyManger';

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