import { Component, input } from '@angular/core';
import { PokemonInfo } from '../pokemon.info';
import { RouterLink } from '@angular/router';

import { ElementRef, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-pokemon',
  imports: [RouterLink],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css'
})

export class Pokemon {
  pokemon = input.required<PokemonInfo>();

  constructor(private renderer: Renderer2) { }

  @ViewChild('cardRef', { static: true }) cardRef!: ElementRef;

  ngAfterViewInit() {
    const card = this.cardRef.nativeElement;

    this.renderer.listen(card, 'mouseenter', () => {
      card.classList.add('active');
    });

    this.renderer.listen(card, 'mouseleave', () => {
      card.classList.remove('active');
      card.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
    });

    this.renderer.listen(card, 'mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) - 0.5;
      const percentY = (y / rect.height) - 0.5;

      const maxRotation = 10;
      const rotateY = percentX * maxRotation * 4;
      const rotateX = -percentY * maxRotation * 4;

      card.style.transform = `
      perspective(1000px)
      scale(1.3)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
    });
  }
}



