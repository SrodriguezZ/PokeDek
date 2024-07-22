import React, {useContext, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Button, FAB, Text, useTheme} from 'react-native-paper';
import {themeContext} from '../../context/ThemeContext';
import {getPokemon} from '../../../action/get-pokemons';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {PokeBallBG} from '../../components/ui/PokeBallBG';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Pokemon} from '../../../domain/Entites';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import LottieView from 'lottie-react-native';
import {ButtonComponent} from '../../components/ButtonComponent';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PropsNavigator} from '../../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
//Interface para poder navegar tenemos dos manera 1.
interface Props extends StackScreenProps<PropsNavigator,'HomeScreen'>{};

export const HomeScreens = ({navigation}:Props) => {
  const LottieImg = require('../../../assets/LottieJson/AnimationPokeball.json');

  const {isDark, theme} = useContext(themeContext);
  const {top,bottom} = useSafeAreaInsets(); //Renderizar en el top
console.log('puto',bottom ,top)
  const themePaper = useTheme();
  //Segunda manera para naevegar 
  //const navigate = useNavigation<NavigationProp<PropsNavigator>>();

  //Obtener el query

  const queryClient = useQueryClient();

  //*Forma tradicional de hacer una peticion http
  // const{isLoading, data:pokemons = []} = useQuery({
  //   queryKey:['pokemons'],//la ruta
  //   queryFn:()=> getPokemon(0),//Seria peticion
  //   staleTime: 1000* 60 * 60, //Los minutos que tendremos en cache
  // })

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'], //la ruta,
    initialPageParam: 0, //La paginacion
    queryFn: async params => {
      const pokemons = await getPokemon(params.pageParam);

      pokemons.forEach(pokemon => {
        //De esta manera podemos setear nuestro query para guardar nuestros datos
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      }); //retornamos el valor obtenido
      return pokemons;
    },
    getNextPageParam: (lastepage, pages) => pages.length, //Se obteiene la ultima pagina y las pagina que son
    staleTime: 1000 * 60 * 60, //Los minutos que tendremos en cache 60min
    //Procesar la informacion que ya esta en cache
  });

  if (isLoading) {
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
          style={style.lottieStyle}
          autoPlay
          loop
        />
      </View>
    );
  }

  const onSubmitSalir = () => {
    queryClient.invalidateQueries({queryKey:['pokemons', 'infinite']})
    navigation.push("Login")//Con push podemos navegar 
  };

  return (
    <View>
      <PokeBallBG style={style.imgPosition} />
      <ButtonComponent
        style={{
          backgroundColor: '#710808',
          position: 'absolute',
          marginLeft: 200,
          marginTop: 30,
        }}
        textColor="white"
        text="Cerrar sesión"
        onSubmit={() => onSubmitSalir()}
      />
      <View style={{marginBottom:80}}></View>
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2} //Numero de columna con esto definos nuestro card
        style={{paddingTop: top + 20}}
        // ListHeaderComponent={() => (
        //   //Renderiza el titulo
        //   <Text variant="displayMedium">Pokédex</Text>
        // )}
        //renederizar el text
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        //rendirzar antes que mi scroll se termine
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        //Quitar barra lateral
        showsVerticalScrollIndicator={false}
      />
      <FAB
      label='Buscar'
      style={[style.fab,{backgroundColor:theme.colors.primary}]}
        mode='elevated'
        color={theme.dark ? 'black':'white'}
        onPress={()=> navigation.push('SearchScreen')}
        />
    </View>
  );
};

//Recordemos que si no ponemos position Absolute  se va abajo en este caso lo ponemos abajo

const style = StyleSheet.create({
  imgPosition: {
    top: -100,
    right: -100,
    position: 'absolute',
  },
  lottieStyle: {
    width: 200,
    height: 200,
  },
  fab:{
    position:'absolute',
    marginTop:15,
    margin:50
  }
});
