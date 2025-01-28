import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { enviroments } from 'src/environments/environments';
import { ListHeroResponse, Data, Hero } from '../interfaces/interfaces';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class HeroesServices {
  // En el servicio de heroes manejo el estado de los datos que voy a usar
  // También manejo las peticiones http y el localStorage
  //! Sería buena idea crear un servicio distinto para los favoritos. Pero como todo corresponte a heroes, lo dejo aquí
  //! No es mala idea implementar  un servicio para manejar el estado de las variables, pero sigo pensando que al ser pequeño se quede todo en el servicio.

  private _heroes = new BehaviorSubject<Hero[]>([]);
  private _favHeroes = new BehaviorSubject<Hero[]>([]);
  private _count = new BehaviorSubject<number>(0);
  private _isLoading = new BehaviorSubject<boolean>(false);

  heroes$ = this._heroes.asObservable();
  favHeroes$ = this._favHeroes.asObservable();
  count$ = this._count.asObservable();
  isLoading$ = this._isLoading.asObservable();

  constructor(private http: HttpClient) {}

  private baseUrl = enviroments.baseUrl;
  private privateKey = enviroments.private_key;
  private publicKey = enviroments.public_key;

  //? Petición : hash = md5(ts + privateKey + publicKey)

  getHeroes(limit: number = 50): void {
    this._isLoading.next(true);
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
    const { hash, ts } = this.getHash();
    const finalUrl = `&ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
    const url = `${this.baseUrl}/characters?nameStartWith=${term}${finalUrl}`;

    this.http
      .get<ListHeroResponse>(url)
      .pipe(map((response) => response.data))
      .subscribe((response) => {
        this._heroes.next(response.results);
        this._count.next(response.count);
        this._isLoading.next(false);
      });
  }

  getHeroById(): Observable<string> {
    return this.http.get<string>('eses');
  }

  saveHeroToFav() {
    localStorage.setItem('heroList', 'hero');
  }
  deleteHeroToFav() {
    localStorage.setItem('heroList', 'hero');
  }

  getFavHeroes() {
    localStorage.getItem('heroList');
  }

  getHash(): { ts: string; hash: string } {
    const ts = new Date().getTime().toString();
    const hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString();
    return { ts, hash };
  }
}
