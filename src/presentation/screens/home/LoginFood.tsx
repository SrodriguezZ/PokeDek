import {View, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useContext, useState} from 'react';
import {Button, Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {themeContext} from '../../context/ThemeContext';
import {ButtonComponent} from '../../components/ButtonComponent';
import ViewComponent from '../../components/ViewComponent';
import {CardComponent} from '../../components/CardComponent';

export const LoginFood = () => {
  const {isDark, theme} = useContext(themeContext);
  const{width} = useWindowDimensions(); 
  const onSubmit = () => {
    console.log(width);
  };
  return (
    <ViewComponent >
      <CardComponent style={{flex:1,alignSelf:'stretch', height:'auto', backgroundColor:'white', borderRadius:15, alignItems:'center'}}>
      <Text variant="titleLarge" style={{color:isDark  ? 'white' :'black' }}>Iniciar Sesión</Text>
      <ButtonComponent
        onSubmit={onSubmit}
        style={{backgroundColor: '#C587D3', width:'50%' }}
        nameIcon="airplane-outline"
        sizeIcon={12}
        text="Iniciar sesión"
      />
      </CardComponent>
      
    </ViewComponent>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#605B56',
    gap: 5,
    flex: 1,
    padding: 20,
  },
  row: {},
  card1: {
    height: 100,
    backgroundColor: '#DAFEB7',
    borderRadius: 15,
  },
  card2: {
    height: 300,
    backgroundColor: '#DAFEB7',
    borderRadius: 15,
  },
  card3: {
    height: 300,
    backgroundColor: 'yellow',
    borderRadius: 15,
  },
  card4: {
    flex: 4,
    width: '28%',
    height: 100,
    backgroundColor: '#DAFEB7',
    borderRadius: 15,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'purple',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  button2: {
    width: 100,
    height: 50,
    backgroundColor: 'purple',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
