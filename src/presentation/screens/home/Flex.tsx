import {View, Text, StyleSheet, Pressable, Dimensions, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';

export const Flex = () => {
  const {} = useWindowDimensions();
  const [counter, setCounter] = useState<number>(0);
  const onSubmit = () => {
    console.log('HolaMundo');
  };
  return (
    <View style={style.container}>
      <View style={style.card1}/>
      <View style={style.card2}/>
      <View style={style.card3}/>

    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#605B56',
    gap: 5,
    flex: 1,
    padding:20
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
    height:300,
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
