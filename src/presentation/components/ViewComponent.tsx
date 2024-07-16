import { View, Text, StyleSheet } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { style } from '../../style/style'

export default function ViewComponent({children}:PropsWithChildren) {
  return (
    <View style={style.container}>
        {children}
    </View>
  )
}

