import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonInfo } from '../pokemon.info';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon.details',
  imports: [RouterLink],
  templateUrl: './pokemon.details.html',
  styleUrl: './pokemon.details.css'
})

export class PokemonDetails {
  route: ActivatedRoute = inject(ActivatedRoute);
  pokemonService: PokemonService = inject(PokemonService);
  pokemonId = 1;
  pokemonInfo: PokemonInfo | undefined;

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.pokemonId = Number(params.get('id'));

      this.loadContent(0);
    })
  }

  /**
   * Fetch the data for the corresponding page
   * @param dir Direction for the fetching (prev = -1, next = 1, default = 0 = no move)
   */
  loadContent(dir: number = 0) {
    switch (dir) {
      case -1:
        if (this.pokemonId == 1) return;

        this.pokemonId--;
        break;
      case 1:
        this.pokemonId++;
        break;
    }

     this.pokemonService.getPokemonById(this.pokemonId).then((pokemonInfo) => {
      this.pokemonInfo = pokemonInfo;
    });
  }
}
