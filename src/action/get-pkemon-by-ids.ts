import { Pokemon } from "../domain/Entites";
import { getPokemonById } from "./getPokemonById";
export const GetPokemonByIds = async (ids:number[]) : Promise<Pokemon[]> => {
    try {
        //Funcion lo cual hago el map para poder cumplir varias veces por id 
        const pokemonPromises : Promise<Pokemon>[] = ids.map(id => {
            return getPokemonById(id)
        })
        //Se cumpla toda la promesa para poder llamar 
        return Promise.all(pokemonPromises);

    } catch (error) {
        throw new Error('Ocurrio un error ')
    }

}