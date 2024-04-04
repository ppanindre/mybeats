import { View, Text } from 'react-native'
import React from 'react'

const colors = {
  white: '#fff',
  PRIMARY: '#0165fc',
  SECONDARY: '#dbeafe',
  LIGHT_GRAY: '#e6e8eb',
  GRAY: '#a6a4a4',
};

export default function SubHeading({subHeadingTitle,seelAll=false}) {
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:10,
        marginTop:10
    }}>
        <Text style={{
            fontSize: 20,
            fontFamily: 'appfont-semi'
        }}>{subHeadingTitle}</Text>
       {seelAll? <Text style={{
            fontFamily: 'appfont',
            color: colors.PRIMARY
        }}>See All</Text>:null}
    </View>
  )
}