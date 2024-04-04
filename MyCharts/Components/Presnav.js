import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TextDisplay from '../Components/DisText'
import Prescription from '../Screens/Prescription'

const Stack=createStackNavigator();
export default function Presnav() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Prescription' component={Prescription} />
        <Stack.Screen name='ImageAnalyzeDisplay' component={TextDisplay} />
    </Stack.Navigator>
  )
}