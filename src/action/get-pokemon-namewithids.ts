import { pokeApi } from "../config/Api/pokeApi";
import { IPokeAPIPaginatedResponse } from "../infranstructure/Interface/pokepi.interface";

export const GetPokemonNameWithIds = async () => {
    const url = 'pokemon?limit=1000';
    const {data} = await pokeApi.get<IPokeAPIPaginatedResponse>(url);
    /*const parts = url.split('/'); // ["https:", "", "pokeapi.co", "api", "v2", "pokemon", "1", ""]*/
    return data.results.map((info) => ({
        id: Number(info.url.split('/')[6]),
        name : info.name
    }))
 }