import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { enviroments } from 'src/environments/environments';
import * as CryptoJS from 'crypto-js';
import { Hero } from '../interfaces/Hero.interface';
import { ListHeroResponse } from '../interfaces/ListHeroResponse.interface';
import { ComicsData, ListComicsResponse } from '../interfaces/Comics.interface';

@Injectable({ providedIn: 'root' })
export class HeroesServices {
  // En el servicio de heroes manejo el estado de los datos que voy a usar
  // También manejo las peticiones http y el localStorage
  //! Sería buena idea crear un servicio distinto para los favoritos. Pero como todo corresponte a heroes, lo dejo aquí
  //! No es mala idea implementar  un servicio para manejar el estado de las variables, pero sigo pensando que al ser pequeño se quede todo en el servicio.

  private _heroes = new BehaviorSubject<Hero[]>([]);
  private _count = new BehaviorSubject<number>(0);
  private _isLoading = new BehaviorSubject<boolean>(false);
  private _hero = new BehaviorSubject<Hero | null>(null);

  private _comics = new BehaviorSubject<ComicsData[]>([]);

  heroes$ = this._heroes.asObservable();
  count$ = this._count.asObservable();
  isLoading$ = this._isLoading.asObservable();
  hero$ = this._hero.asObservable();
  comics$ = this._comics.asObservable();

  constructor(private http: HttpClient) {}

  private baseUrl = enviroments.baseUrl;
  private privateKey = enviroments.private_key;
  private publicKey = enviroments.public_key;

  //? Petición : hash = md5(ts + privateKey + publicKey)

  getHeroes(limit: number = 50): void {
    this._isLoading.next(true);
    this._count.next(0);
    const { hash, ts } = this.getHash();
    const finalUrl = `&ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;

    const url = `${this.baseUrl}/characters?limit=${limit}${finalUrl}`;

    this.http
      .get<ListHeroResponse>(url)
      .pipe(map((response) => response.data))
      .subscribe((response) => {
        this._heroes.next(response.results);
        this._count.next(response.count);
        this._isLoading.next(false);
      });
  }

  searchHeroes(term: string): void {
    this._isLoading.next(true);
    this._count.next(0);
    const { hash, ts } = this.getHash();
    const finalUrl = `&ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
    const url = `${this.baseUrl}/characters?nameStartsWith=${term}${finalUrl}`;

    if (term === '') {
      this.getHeroes();
      return;
    }
    this.http
      .get<ListHeroResponse>(url)
      .pipe(map((response) => response.data))
      .subscribe((response) => {
        this._heroes.next(response.results);
        this._count.next(response.count);
        this._isLoading.next(false);
      });
  }

  getHeroById(id: string): Observable<Hero> {
    if (!id.trim()) {
      return of(null as any);
    }

    this._isLoading.next(true);
    const { hash, ts } = this.getHash();
    const finalUrl = `&ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
    const url = `${this.baseUrl}/characters/${id}?${finalUrl}`;

    return this.http.get<ListHeroResponse>(url).pipe(
      map((response) => response.data.results[0]),
      tap((hero) => {
        this._hero.next(hero);
        this._isLoading.next(false);
      })
    );
  }

  getComics(collectionURI: string): Observable<ComicsData[]> {
    this._isLoading.next(true);
    const { hash, ts } = this.getHash();
    const finalUrl = `&ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
    const url = `${collectionURI}?${finalUrl}`;

    return this.http.get<ListComicsResponse>(url).pipe(
      map((response) => response.data.results),
      tap((comics) => {
        this._comics.next(comics);
        this._isLoading.next(false);
      })
    );
  }

  getHash(): { ts: string; hash: string } {
    const ts = new Date().getTime().toString();
    const hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString();
    return { ts, hash };
  }
}
