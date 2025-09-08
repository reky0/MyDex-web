import { Injectable } from '@angular/core';
import { PokemonInfo } from './pokemon.info';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  url = 'https://pokeapi.co/api/v2/pokemon';

  // pokemonList: PokemonInfo[] = [
  //   {
  //     id: 722,
  //     name: 'Rowlet',
  //     height: 3,
  //     weight: 15,
  //     base_experience: 64,
  //   },
  //   {
  //     id: 723,
  //     name: 'Dartrix',
  //     height: 7,
  //     weight: 160,
  //     base_experience: 147,
  //   },
  //   {
  //     id: 724,
  //     name: 'Decidueye',
  //     height: 16,
  //     weight: 366,
  //     base_experience: 239,
  //   },
  //   {
  //     id: 722,
  //     name: 'Rowlet',
  //     height: 3,
  //     weight: 15,
  //     base_experience: 64,
  //   },
  //   {
  //     id: 723,
  //     name: 'Dartrix',
  //     height: 7,
  //     weight: 160,
  //     base_experience: 147,
  //   },
  //   {
  //     id: 724,
  //     name: 'Decidueye',
  //     height: 16,
  //     weight: 366,
  //     base_experience: 239,
  //   },
  // ];

  async getAllPokemon(limit = 20, offset = 0): Promise<PokemonInfo[]> {
    const response = await fetch(`${this.url}?limit=${limit}&offset=${offset}`);
    const data = (await response.json());
    const results = data.results ?? [];
    console.log(results);

    for (let i in results) {
      // console.log(i);

      let id = Number(i) + 1 + offset
      console.log(id);
      results[i]["id"] = id
      results[i]["image"] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      this.getPokemonTypes(String(id)).then((types) => {
        results[i]["type1"] = types && types[0] ? types[0] : '';
        results[i]["type2"] = types && types[1] ? types[1] : '';
      });
      console.log(results[id]);
    }

    return results ?? [];
  }

  async getPokemonById(id: number): Promise<PokemonInfo | undefined> {
    const response = await fetch(`${this.url}/${id}`);
    const data = (await response.json());
    const result = data ?? {};
    console.log(result);

      // console.log(i);

      console.log(id);
      result["image"] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      this.getPokemonTypes(String(id)).then((types) => {
        result["type1"] = types && types[0] ? types[0] : '';
        result["type2"] = types && types[1] ? types[1] : '';
      });
      console.log(result);

    return result ?? [];
  }

  async getPokemonTypes(id: string): Promise<string[] | undefined> {
    let result = ['', ''];

    const response = await fetch(`${this.url}/${id}`);
    const data = await response.json();
    const types = data.types;

    for (let i in types) {
      result[Number(i)] = types[i]["type"]["name"];
    }

    return result;
  }
}
