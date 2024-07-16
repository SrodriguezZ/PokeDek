import React, { useContext, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper'
import { themeContext } from '../../context/ThemeContext';
import { getPokemon } from '../../../action/get-pokemons';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { PokeBallBG } from '../../components/ui/PokeBallBG';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pokemon } from '../../../domain/Entites';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const HomeScreens = () => {
    const {isDark, theme} = useContext(themeContext);
    const {top} = useSafeAreaInsets()//Renderizar en el top

    //Obtener el query

    const queryClient = useQueryClient();

    //*Forma tradicional de hacer una peticion http
  // const{isLoading, data:pokemons = []} = useQuery({
  //   queryKey:['pokemons'],//la ruta
  //   queryFn:()=> getPokemon(0),//Seria peticion 
  //   staleTime: 1000* 60 * 60, //Los minutos que tendremos en cache
  // })

  const{isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey:['pokemons','infinite'],//la ruta,
    initialPageParam:0,//La paginacion
    queryFn:async (params)=> {
    
      const pokemons = await getPokemon(params.pageParam)

      pokemons.forEach((pokemon) => {
        //De esta manera podemos setear nuestro query para guardar nuestros datos
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon)
      });//retornamos el valor obtenido
      return pokemons;
    },
    getNextPageParam:(lastepage, pages) => pages.length, //Se obteiene la ultima pagina y las pagina que son
    staleTime: 1000* 60 * 60, //Los minutos que tendremos en cache 60min
    //Procesar la informacion que ya esta en cache

  })

  return (
    <View>
        <PokeBallBG style={style.imgPosition } />
        <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon,index) => `${pokemon.id}-${index}`}
        numColumns={2} //Numero de columna con esto definos nuestro card
        style={{paddingTop: top+ 20}}
        ListHeaderComponent={()=> (//Renderiza el titulo
          <Text variant='displayMedium'>Pokédex</Text>
        )}
        //renederizar el text
        renderItem={({item})=> (
          <PokemonCard pokemon={item}/>
        )}
        //rendirzar antes que mi scroll se termine
        onEndReachedThreshold={0.6}
        onEndReached={()=> fetchNextPage()}
        //Quitar barra lateral
        showsVerticalScrollIndicator={false}
        />
    </View>
  )
}

//Recordemos que si no ponemos position Absolute  se va abajo en este caso lo ponemos abajo

const style = StyleSheet.create({
  imgPosition:{
    top:-100,
    right:-100,
    position:'absolute'
    
  }
})
