import { FavHero } from '../../interfaces/FavHero.interface';
import { FavHeroesService } from './../../services/fav-heroes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './favorites-heroes-page.component.html',
  styleUrls: ['./favorites-heroes-page.component.css'],
})
export class FavoritesHeroesPageComponent implements OnInit {
  public favHeroes: FavHero[] = [];
  public favCount: number = 0;
  public searchResult: FavHero[] = [];
  public searchCount: number = 0;

  constructor(private favHeroesService: FavHeroesService) {}

  ngOnInit(): void {
    this.favHeroesService.favCount$.subscribe((favCount) => {
      this.favCount = favCount;
    });

    this.favHeroesService.favHeroes$.subscribe((favHeroes) => {
      this.favHeroes = favHeroes;
    });

    // this.favHeroesService.searchCount$.subscribe((searchCount) => {
    //   this.searchCount = searchCount;
    // });
  }
}
