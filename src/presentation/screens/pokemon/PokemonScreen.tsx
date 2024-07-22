import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Chip, Text } from 'react-native-paper'
import { PropsNavigator } from '../../navigator/StackNavigator'
import { useQuery } from '@tanstack/react-query'
import { getPokemonById } from '../../../action'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Formatter } from '../../../config/Helpers/formatter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { themeContext } from '../../context/ThemeContext'
import { FadeInImage } from '../../components/ui/FadeImage'
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonComponent } from '../../components/ButtonComponent'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'


interface Props extends StackScreenProps<PropsNavigator,'PokemonScreen'>{}

export const  PokemonScreen = ({navigation,route}:Props) => {
  const {top} = useSafeAreaInsets();
  const {pokemonId}= route.params;
  const LottieImg = require('../../../assets/LottieJson/AnimationPokeball.json');
  //saber el thema
  const {isDark} = useContext(themeContext);

  const {isLoading, data:pokemon} = useQuery({
    queryKey:['pokemon', pokemonId],
    queryFn:()=>getPokemonById(pokemonId),
    staleTime: 1000* 60 * 60 //Tiempo duracion del cache
  })

  if(!pokemon){ // haciendo la negaicion que si no se tiene un pokemon si es false se pone en true ya que no tiene un pokemon 
    // return (
    //   <FullScreenLoader/>
    // )
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <LottieView
          source={LottieImg}
          style={styles.lottieStyle}
          autoPlay
          loop
        />
      </View>
    );
  }
  const navigate = useNavigation<NavigationProp<PropsNavigator>>();
  const pokeballImg = isDark ? require('../../../assets/pokeball-dark.png') : require('../../../assets/pokeball-light.png')
  return (
    <ScrollView
    style={{flex:1, backgroundColor:pokemon.color}}
    bounces={false}
    showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>


      <Text
      style={ {
        ...styles.pokemonName,
        top: top + 5,
      } }>
      { Formatter.capitalize( pokemon.name ) + '\n' }#{ pokemon.id }
    </Text>

    <ButtonComponent
        style={{
          backgroundColor: '#710808',
        }}
        textColor="white"
        text="Atras"
        onSubmit={() => navigate.goBack()}
      />

    {/*Variable para la imagen y obtener el dark o light  Imagen de la pokeball*/}
    <Image source={pokeballImg} style={styles.pokeball} />
    {/*Icon de pokemon */}
    <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />

    </View>

    {/*Pequeños notificaicones con chip paper */}
    <View
    style={{flexDirection:'row', marginHorizontal:20, marginTop:10}}
    >

      {pokemon.types.map( type => (
        <Chip
        key={type}
        mode='outlined'
        selectedColor='black'
        icon={()=><Icon name='information-circle-outline' size={20} color={'white'}></Icon>}
        style={{marginLeft:10}}
>
          {type}
        </Chip>
      ))}
    </View>

    {/**Sprinte */}

    <FlatList
    data={pokemon.sprites}
    horizontal
    keyExtractor={item => item}
    showsHorizontalScrollIndicator={false}
    centerContent
    style={{
      marginTop:20,
      height:100
    }}
    renderItem={({item})=> (
      <FadeInImage uri={item} style={{width:100,height:100, marginHorizontal:5 }} />
    )}
    />

<Text style={styles.subTitle}>Habilidades</Text>
    <FlatList
      data={pokemon.abilities}
      keyExtractor={item => item}
      horizontal
      renderItem={({item})=> (
        <Chip>{Formatter.capitalize(item)}</Chip>
      )}
    />
     <Text style={styles.subTitle}>Stats</Text>
    <FlatList
      data={pokemon.stats}
      keyExtractor={item => item.name}
      horizontal
      renderItem={({item})=> (
        <View style={styles.statsContainer}>
          <Text >
          {Formatter.capitalize(item.name)}
          </Text>
          <Text>{item.value}</Text>
        </View>
      )}
    />
    <Text style={styles.subTitle}>Moves</Text>
    <FlatList
      data={pokemon.moves}
      keyExtractor={item => item.name}
      horizontal
      renderItem={({item})=> (
        <View style={styles.statsContainer}>
          <Text>{Formatter.capitalize(item.name)}</Text>
          <Text>{item.level}</Text>
        </View>
      )}
    />
    <Text style={styles.subTitle}>Games</Text>
    <FlatList
      data={pokemon.games}
      keyExtractor={item => item}
      horizontal
      renderItem={({item})=> (
        <Chip>{Formatter.capitalize(item)}</Chip>
      )}
    />
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  headerContainer : {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 370,
    borderBottomRightRadius:1000,
    borderBottomLeftRadius:1000,
    alignItems:'center',
    zIndex:999
  },
  pokemonName:{
    color:'white',
    fontSize:40,
    alignSelf:'flex-start',
    left:20
  },
  pokeball:{
    width:240,
    height:240,
    bottom:-20,
    opacity:0.7
  },
  pokemonImage:{
    position:'absolute',
    width:240,
    height:240,
    bottom:-40
  },
  subTitle:{
    color:'white',
    fontWeight:'bold',
    fontSize:18,
    marginHorizontal:10,
    marginTop:20
  },
  statsContainer:{
    marginHorizontal:20,//da margen entre laddos
    alignItems:'center'//alinear al centro
  } , lottieStyle: {
    width: 200,
    height: 200,
  },
})
