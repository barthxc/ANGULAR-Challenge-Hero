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

  public favHeroes: FavHero[] = [];

  ngOnInit(): void {
    this.favHeroesService.favHeroes$.subscribe((favHeroes) => {
      this.favHeroes = favHeroes;
    });
  }

  clickHero() {
    const { id, name, thumbnail } = this.hero;
    const favHero = { id, name, thumbnail };

    this.favHeroesService.toggleFavHero(favHero);
  }
}
