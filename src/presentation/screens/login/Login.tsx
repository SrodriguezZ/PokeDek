import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {themeContext} from '../../context/ThemeContext';
import {style} from '../../../style/style';
import {Card, Divider, HelperText, TextInput} from 'react-native-paper';
import {useFormik} from 'formik';
import {defaultLogin, validationSchema} from './formik';
import {ButtonComponent} from '../../components/ButtonComponent';
import {CustomInput} from '../../components/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PropsNavigator } from '../../navigator/StackNavigator';
import { getColorFromLogin } from '../../../config/Helpers/get-colors';
import Animation from '../../../assets/LottieJson/AnimationPokeball.json'
import LottieView from 'lottie-react-native';

export const Login = () => {
  const {isDark} = useContext(themeContext);
  const imgLogin = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');


  const {height, width} = Dimensions.get('window');
  //OBtener el alto y ancho
  //console.log('Alto', height, 'ancho', width);
  const iconPokemon = require('../../../assets/toys-5353951_640.jpg');
  const iconPokeball = require('../../../assets/pokeball-5128709_640.jpg');
const [isData, setisData] = useState<boolean>(false)

  const navigate = useNavigation<NavigationProp<PropsNavigator>>();

  const formikLogin = useFormik({
    initialValues: defaultLogin,
    //validationSchema: validationSchema,
    onSubmit: async values => {
      navigate.navigate("HomeScreen");
    },
  });

 
  return (
    <View style={styes.container}>
      
      <Image
        source={iconPokemon}
        style={[styes.styleImage, {width: width, height: height}]}
      />
      <View style={styes.styleCard}>
        <Image source={iconPokeball} style={styes.logoImg} />
        <Divider />
        <CustomInput formik={formikLogin} name="email" placeholder="Email" />
        <CustomInput
          placeholder="Password"
          name="password"
          secureTextEntry
          formik={formikLogin}
        />
        <ButtonComponent
          nameIcon="log-in-outline"
          sizeIcon={25}
          colorIcon='white'
          text="Ingresar"
          textColor='white'
          onSubmit={formikLogin.handleSubmit}
          style={{backgroundColor: '#710808', marginTop:50}}
        />
      </View>
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
    position: 'absolute',
    opacity: 1,
  },
  styleCard: {
    flexDirection: 'column',
    margin: 20,
    alignSelf: 'stretch',
    height: 500,
    padding: 20,
    alignItems: 'center',
  },
  logoImg: {
    alignSelf: 'center',
    marginRight: 30,
    width: 130,
    height: 150,
    borderRadius: 120,
  },
});
