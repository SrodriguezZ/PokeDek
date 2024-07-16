import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, {useContext} from 'react';
import {Button} from 'react-native-paper';
import {themeContext} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface IButtonPresp {
  onSubmit: () => void;
  nameIcon: string;
  sizeIcon?: number;
  text: string;
  style?:StyleProp<ViewStyle>
}
export const ButtonComponent = ({
  onSubmit,
  nameIcon,
  sizeIcon = 12,
  text,
  style
}: IButtonPresp) => {
  const {isDark, theme} = useContext(themeContext);

  return (
    <Button
      onPress={onSubmit}
      style={style}
      mode="contained"
      children={text}
      icon={() => <Icon name={nameIcon} size={sizeIcon} color={isDark ? 'white' : 'black'}/>}
    />
  );
};
