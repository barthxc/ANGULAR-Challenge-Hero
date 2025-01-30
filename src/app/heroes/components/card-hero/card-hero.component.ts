import { HeroesServices } from './../../services/heroes.service';
import { FavHeroesService } from './../../services/fav-heroes.service';
import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/Hero.interface';
import { FavHero } from '../../interfaces/FavHero.interface';

@Component({
  selector: 'card-hero',
  templateUrl: './card-hero.component.html',
  styleUrls: ['./card-hero.component.css'],
})
export class CardHeroComponent implements OnInit {
  constructor(private favHeroesService: FavHeroesService) {}
  @Input() hero!: Hero | FavHero;

  public heroes: Hero[] = [];

  public isFav: boolean = false;

  public isHovered: boolean = false;

  ngOnInit(): void {
    // Uso directamente los heroes favoritos y hago un filtro comparando el ID por el heroe que tiene el componente al iterarlo
    this.favHeroesService.favHeroes$.subscribe((favHeroes) => {
      this.isFav = favHeroes.some((favHero) => favHero.id === this.hero.id);
    });
  }

  clickHero() {
    const { id, name, thumbnail } = this.hero;
    const favHero = { id, name, thumbnail };

    this.favHeroesService.toggleFavHero(favHero);
  }
}
