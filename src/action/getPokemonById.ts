import { pokeApi } from "../config/Api/pokeApi";
import { Pokemon } from "../domain/Entites";
import { IPokeAPIPokemon } from "../infranstructure/Interface/pokepi.interface";
import { PokemonMapper } from "../infranstructure/Mappers/pokemon.mapper";

export const getPokemonById = async (id:number) : Promise<Pokemon> => { 
    try {
        const {data} = await pokeApi.get<IPokeAPIPokemon>(`/pokemon/${id}`)
        const pokemon  = await PokemonMapper.pokeApiPokemonToEntity(data)
        return pokemon;
    } catch (error) {
          throw new  Error("Ocurrio un error");
    }
 }