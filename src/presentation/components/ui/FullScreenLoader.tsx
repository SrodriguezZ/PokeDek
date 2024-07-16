import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { themeContext } from '../../context/ThemeContext';

export const FullScreenLoader = () => {
  
    const  {colors} =useTheme();
    const {isDark} = useContext(themeContext);
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:colors.background }}>
      <ActivityIndicator
      color={isDark ? 'white' : 'black'}
      size={50}
      />
    </View>
  );
};
