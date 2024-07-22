import {FormikProps} from 'formik';
import React from 'react';
import {View, Text} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

interface Props {
  formik: FormikProps<any>;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
}
export const CustomInput = ({
  formik,
  name,
  placeholder,
  secureTextEntry,
}: Props) => {

    const error = formik.touched[name] && formik.errors[name];
  return (
    <View>
      <TextInput
        cursorColor="white"
        //activeUnderlineColor='white'   Cambia el color del input
        style={{width: 250, marginTop: 5, opacity: 0.8, textShadowColor:'black'}}
        mode="outlined"
        textColor="black"
        label={placeholder}
        id={name}
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        secureTextEntry={secureTextEntry}
      />
      {error && typeof error === 'string' && (
        <HelperText style={{color:'red'}} type="error" visible={true}>
          {error}
        </HelperText>
      )}
    </View>
  );
};
