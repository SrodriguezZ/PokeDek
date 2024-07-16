import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {themeContext} from '../../context/ThemeContext';
import {style} from '../../../style/style';
import {Card, Divider, TextInput} from 'react-native-paper';

export const Login = () => {
  const {isDark} = useContext(themeContext);
  const imgLogin = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');
  const iconPokemon = require('../../../assets/pokemon.png');
  const [text, setText] = React.useState<string>('');
  return (
    <View style={styes.container}>
      <Image source={imgLogin} style={styes.styleImage} />
      <Card style={styes.styleCard}>
        <Image source={iconPokemon} style={styes.logoImg} />
        <Divider/>
        <TextInput
        style={{width:250}}
        mode='outlined'
          label="Email"
          value={text}
          onChangeText={text => setText(text)}
        />
      </Card>
    </View>
  );
};

const styes = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleImage: {
    width: 300,
    height: 300,
    position: 'absolute',
  },
  styleCard: {
    flexDirection:'column',
    margin: 20,
    alignSelf:'stretch',
    height: 500,
    padding: 20,
    alignItems: 'center',
  },
  logoImg: {
    alignSelf:'center',
    width: 150,
    height: 100,
    borderRadius: 10,
  },
});
