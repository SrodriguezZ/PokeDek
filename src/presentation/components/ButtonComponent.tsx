import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, {useContext} from 'react';
import {Button} from 'react-native-paper';
import {themeContext} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface IButtonPresp {
  onSubmit: () => void;
  nameIcon?: string;
  sizeIcon?: number;
  text: string;
  textColor?:string
  style?:StyleProp<ViewStyle>
  colorIcon?:string
}
export const ButtonComponent = ({
  onSubmit,
  nameIcon,
  sizeIcon = 12,
  text,
  style,
  textColor,
  colorIcon
}: IButtonPresp) => {
  const {isDark, theme} = useContext(themeContext);

  return (
    <Button
      onPress={onSubmit}
      style={style}
      mode="contained"
      children={text}
      textColor={textColor}
      icon={nameIcon ?() => <Icon name={nameIcon} size={sizeIcon} color={colorIcon}/>:undefined}
    />
  );
};
