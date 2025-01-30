import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavHero } from '../interfaces/FavHero.interface';

@Injectable({
  providedIn: 'root',
})
export class FavHeroesService {
  constructor() {}

  private _favHeroes = new BehaviorSubject<FavHero[]>(
    JSON.parse(localStorage.getItem('favHeroes') || '[]')
  );

  private _favCount = new BehaviorSubject<number>(
    JSON.parse(localStorage.getItem('favHeroes') || '[]').length
  );

  favHeroes$ = this._favHeroes.asObservable();
  favCount$ = this._favCount.asObservable();

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
    localStorage.setItem('favHeroes', JSON.stringify(updatedHeroes));

    this._favHeroes.next(updatedHeroes);
    this._favCount.next(updatedHeroes.length);
  }

  deleteHeroToFav(hero: FavHero): void {
    //Actualización de LS sin modificar el BehaviorS
    const LocalStorageHeroes: FavHero[] = JSON.parse(
      localStorage.getItem('favHeroes') || '[]'
    );

    const updatedLocalStorage = LocalStorageHeroes.filter((h) => {
      return h.id !== hero.id;
    });
    localStorage.setItem('favHeroes', JSON.stringify(updatedLocalStorage));

    //Actualización del Behavior sin referenciar a LS
    const updatedHeroes = this._favHeroes.value.filter((h) => h.id !== hero.id);
    this._favHeroes.next(updatedHeroes);

    this._favCount.next(
      JSON.parse(localStorage.getItem('favHeroes') || '[]').length
    );
  }

  searchFavHeroes(term: string): void {
    //! Filtrar por el LocalStorage y no por el el BehaviorSubject ya que no puedes filtrar sobre el filtro cuando vas elimandno carácteres.

    const favHeroes = JSON.parse(
      localStorage.getItem('favHeroes') || '[]'
    ) as FavHero[];

    if (term === '') {
      this._favHeroes.next(
        JSON.parse(localStorage.getItem('favHeroes') || '[]')
      );
      return;
    }

    const filteredHeroes = favHeroes.filter((heroe) =>
      heroe.name.toLowerCase().startsWith(term.toLowerCase())
    );

    this._favHeroes.next(filteredHeroes);
  }
}
