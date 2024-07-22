import React, { useMemo, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pokemon } from '../../../domain/Entites';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { GetPokemonByIds, GetPokemonNameWithIds } from '../../../action';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebouncendValue } from '../../hook/useDebouncendValue';

export const SearchScreen = () => {
    //Dar espacio para la separacion de safe 
    const {top} = useSafeAreaInsets();

    /*Creacion del query
    . isLoadin -> para ver si nuestra data esta creada
    .Data -> nuestra data cargada lo cual podemos poner sobre nombre con data : sobreNOmbre
    */
    const {isLoading, data: pokemonNameList} = useQuery({
        queryKey:['pokemon','all'], //Url como vamos a llamar
        queryFn:() => GetPokemonNameWithIds() //La funcion que vamos a llamar para guardar en cache 
    })

    const [term, setterm] = useState('')
    //Creacion deouncenValue
    const debouncedValue = useDebouncendValue(term);//guardo el valor del input para usar eldebouncendValue
    /*
    Usamos useMemo para guardar la peticion lo cual esto nos ayuda para que cuando se renderiza la pagina guardemos 
    Obviamente si a cambiado nuestra opcion 
    */

    const pokemonNameIdList = useMemo(() => {
        if(!isNaN(Number(debouncedValue))){
            const pokemon = pokemonNameList?.find( pokemon => pokemon.id === Number(debouncedValue))
            return pokemon ? [pokemon] : []
        }
        //Preguntamos la longitud
        if(debouncedValue.length === 0) return [];
        if(debouncedValue.length < 3) return [];

        return pokemonNameList?.filter(
            pokemon => pokemon.name.includes(debouncedValue.toLocaleLowerCase()),
        )
    },[debouncedValue])

    if(isLoading){
        return (
            <FullScreenLoader/>
        )
    }
    //Creamos otra query para poder tambien guardar en cache los pokemones que el usario trajo
    //Tengamos en consideracion que podemos poner un [] vacio para poder consdieracion que si es vacio 
    const {isLoading:isLoadingPokemons , data: pokemons = []} = useQuery({
        queryKey:['pokemon','by', pokemonNameIdList],
        queryFn:()=>GetPokemonByIds(pokemonNameIdList?.map(id => id.id)!),
        staleTime: 1000 * 60 *5
    })

    return (
    <View style={{padding:10, top:top +20}} >
      <TextInput 
      
      placeholder='Buscar Pokémon'
      autoCorrect={false}
      mode='outlined'
      autoFocus
      value={term}
      onChangeText={setterm}
      />
      {
        isLoadingPokemons && (

            <ActivityIndicator style={{top:10}}/>
        )
      }
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2} //Numero de columna con esto definos nuestro card
        style={{paddingTop: top + 20}}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        //Para dar espacio entre el teclado y el view pueda seguir
        ListFooterComponent={
        <View style={{height:200}}/>
        }
      />
    </View>
  );
};
