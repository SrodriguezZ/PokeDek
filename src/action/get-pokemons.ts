import {pokeApi} from '../config/Api/pokeApi';
import {Pokemon} from '../domain/Entites/pokemon';
import {
  IPokeAPIPaginatedResponse,
  IPokeAPIPokemon,
} from '../infranstructure/Interface/pokepi.interface';
import {PokemonMapper} from '../infranstructure/Mappers/pokemon.mapper';

// const sleep = () => {
//     return new Promise(resolve => setTimeout(resolve,200))
// }
export const getPokemon = async (page: number,limit: number = 20,): Promise<Pokemon[]> => {
  //await sleep()
  try {
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const {data} = await pokeApi.get<IPokeAPIPaginatedResponse>(url);

    const pokemonPromises = data.results.map(info => {
      //Obteniendo las url de cada pokemon
      return pokeApi.get<IPokeAPIPokemon>(info.url);
    });
    //Retornamos toda las promesas lo cual usamos Promise.all
    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemonsPromises = pokeApiPokemons.map(item =>
      PokemonMapper.pokeApiPokemonToEntity(item.data),
    );
    return await  Promise.all(pokemonsPromises);

  } catch (error) {
    throw new Error('Error getting pokemons');
  }
};
