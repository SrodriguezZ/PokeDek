import React, { useContext } from 'react';
import { View, Text, StyleProp, Image, ImageStyle } from 'react-native';
import { themeContext } from '../../context/ThemeContext';
interface Props{
    style?: StyleProp<ImageStyle>;
}
export const PokeBallBG = ({style}:Props) => {
    const {isDark} = useContext(themeContext)
    const img = isDark ?  require('../../../assets/pokeball-light.png') : require('../../../assets/pokeball-dark.png') 
  return (
    <Image 
    source={img} 
    style={[
        //Style Personalizado
        {
            width:300,
            height:300,
            opacity:0.3
        },style
    ]}/>
  );
};
