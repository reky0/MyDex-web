import { Component, signal, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonInfo } from '../pokemon.info';
import { Pokemon } from '../pokemon/pokemon';
import { PokemonService } from '../pokemon.service';
import { RouterModule } from '@angular/router';
import routeConfig from '../routes';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home',
  imports: [Pokemon, RouterModule, ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})


export class Home {
  protected readonly title = signal('mydex');

  // pokemon: PokemonInfo = {
  //   id: 722,
  //   name: 'Rowlet',
  //   image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/722.png',
  //   height: 3,
  //   weight: 15,
  //   base_experience: 64,
  //   type1: "grass",
  //   type2: "flying",
  // };

  pokemonList: PokemonInfo[] = [];
  pokemonService: PokemonService = inject(PokemonService);
  offset = 0;
  limit = 30;
  page = 1;

  constructor() {
    this.loadContent();
  }

  // @ViewChild(InfiniteScrollDirective)
  // infiniteScroll?: InfiniteScrollDirective;

  // onScroll() {
  //   console.log("scroll triggered");

  //   let newList: PokemonInfo[] = [];
  //   this.offset += this.limit;

  //   setTimeout(() => {

  //     this.pokemonService
  //       .getAllPokemon(this.limit, this.offset)
  //       .then((pokemonList: PokemonInfo[]) => {
  //         newList = pokemonList;
  //         console.log('newlist');
  //         console.log(newList);

  //         this.pokemonList = [...this.pokemonList, ...newList]
  //         console.log('updated pokemon list');

  //         console.log(this.pokemonList);

  //         setTimeout(() => {
  //           window.dispatchEvent(new Event('resize'));
  //         }, 200);
  //       });
  //   }, 500);
  // }

  // checkIfScrollNeeded(): void {
  //   const container = document.querySelector('.main-content');
  //   if (container && container.scrollHeight <= container.clientHeight) {
  //     this.onScroll(); // Trigger manually
  //   }
  // }

  /**
   * Fetch the data for the corresponding page
   * @param dir Direction for the fetching (prev = -1, next = 1, default = 0 = no move)
   */
  loadContent(dir: number = 0) {
    switch (dir) {
      case -1:
        if (this.offset == 0) return;

        this.offset -= this.limit;
        break;
      case 1:
        this.offset += this.limit;
        break;
      default:
        this.offset = 0;
    }

    this.pokemonService
      .getAllPokemon(this.limit, this.offset)
      .then((pokemonList: PokemonInfo[]) => {
        this.pokemonList = pokemonList;
      });

    console.log(this.pokemonList);

    this.page += dir;
  }
}
