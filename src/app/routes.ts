import { Routes } from "@angular/router";
import { Home } from "./home/home";
import { PokemonDetails } from "./pokemon.details/pokemon.details";

const routeConfig: Routes = [
  {
    path: '',
    component: Home,
    title: 'MyDex | Home',
  },
  {
    path: 'pokemon.details/:id',
    component: PokemonDetails,
    title: 'Pokémon Details',
  },
];

export default routeConfig;
