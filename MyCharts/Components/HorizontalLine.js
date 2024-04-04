import { View, Text } from 'react-native'
import React from 'react'

const colors = {
  white: '#fff',
  PRIMARY: '#0165fc',
  SECONDARY: '#dbeafe',
  LIGHT_GRAY: '#e6e8eb',
  GRAY: '#a6a4a4',
};

export default function HorizontalLine() {
  return (
    <View style={{
        borderBottomWidth: 1,
        borderColor: colors.LIGHT_GRAY, margin: 5, 
        marginBottom: 15,
        marginTop:15
    }}></View>
  )
}