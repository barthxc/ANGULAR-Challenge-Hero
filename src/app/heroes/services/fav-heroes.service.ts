import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavHero } from '../interfaces/FavHero.interface';

@Injectable({
  providedIn: 'root',
})
export class FavHeroesService {
  constructor() {}

  private _favHeroes = new BehaviorSubject<FavHero[]>([]);
  private _favCount = new BehaviorSubject<number>(0);
  private _searchResult = new BehaviorSubject<FavHero[]>([]);
  private _searchCount = new BehaviorSubject<number>(0);

  favHeroes$ = this._favHeroes.asObservable();
  favCount$ = this._favCount.asObservable();
  searchResult$ = this._searchResult.asObservable();
  searchCount$ = this._searchCount.asObservable();

  toggleFavHero(hero: FavHero): void {
    const exists = this._favHeroes.value.some((h) => h.id === hero.id);

    if (exists) {
      this.deleteHeroToFav(hero);
    } else {
      this.saveHeroToFav(hero);
    }
  }

  saveHeroToFav(hero: FavHero): void {
    const updatedHeroes = [...this._favHeroes.value, hero];

    this._favHeroes.next(updatedHeroes);
    this._favCount.next(updatedHeroes.length);
  }

  deleteHeroToFav(hero: FavHero): void {
    const updatedHeroes = this._favHeroes.value.filter((h) => h.id !== hero.id);

    this._favHeroes.next(updatedHeroes);
    this._favCount.next(updatedHeroes.length);
  }

  searchFavHeroes(term: string): void {
    this._searchCount.next(0);
    const favHeroes = this._favHeroes.value;

    if (term === '') {
      this._searchResult.next([]);
      return;
    }

    const filteredHeroes = favHeroes.filter((heroe) => {
      heroe.name.toLowerCase().startsWith(term.toLowerCase());
    });

    this._searchResult.next(filteredHeroes);
    this._searchCount.next(filteredHeroes.length);
  }
}
