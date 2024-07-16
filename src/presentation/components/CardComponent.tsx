import { View, Text, StyleProp, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
interface ICard{
  style?:StyleProp<ViewStyle>;
  children: React.ReactNode;
}
export const  CardComponent =({style,children}:ICard) =>  {
  return (
    <View style={style}>
      {children}
    </View>
  )
}