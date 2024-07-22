import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {Pokemon} from '../../../domain/Entites';
import {Card, Text} from 'react-native-paper';
import {FadeInImage} from '../ui/FadeImage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PropsNavigator } from '../../navigator/StackNavigator';
interface Props {
  pokemon: Pokemon;
}
export const PokemonCard = ({pokemon}: Props) => {
  
  const navigate = useNavigation<NavigationProp<PropsNavigator>>();

  return (
    //TODO: color fondo
    <Pressable style={{flex:1}} onPress={() => navigate.navigate('PokemonScreen',{pokemonId:pokemon.id}) }>
      <Card style={[style.cardContainer, {backgroundColor: pokemon.color}]}>
        <Text variant="bodyLarge" style={[{}, style.text]}>
          {pokemon.name}
          {'\n#' + pokemon.id}
        </Text>
        {/*Pokebal background image */}
        <View style={style.pokeballContainer}>
          <Image
            source={require('../../../assets/pokeball-light.png')}
            style={style.pokeball}
          />
        </View>
        {/*Pokemon Image */}
        <FadeInImage uri={pokemon.avatar} style={style.pokemonImage} />
        {/**Type */}
        <Text style={style.textType}>{pokemon.types[0]}</Text>
      </Card>
    </Pressable>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    margin: 10,
    flex: 1,
    height: 150,
    backgroundColor: '#75777A',
    padding: 10,
  },
  text: {
    color: 'white',
  },
  pokeball: {
    width: 100,
    height: 100,
    top: -20,
    right: -25,
    opacity: 0.4, //dar opacidad a la imagen
  },
  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -15,
    top: -30,
  },
  textType: {
    color: 'white',
    marginTop: 35,
  },
});
