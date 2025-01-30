import { Component, OnInit } from '@angular/core';
import { HeroesServices } from '../../services/heroes.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/Hero.interface';
import { ComicsData } from '../../interfaces/Comics.interface';

@Component({
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css'],
})
export class HeroPageComponent implements OnInit {
  public hero: Hero | null = null;
  public favHeroes: Hero[] = [];
  public isLoading: boolean = false;
  public comicsData: ComicsData[] = [];

  constructor(
    private heroesService: HeroesServices,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.heroesService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id)),
        switchMap((hero) => {
          this.hero = hero;
          return this.heroesService.getComics(hero.comics.collectionURI);
        })
      )
      .subscribe((comics) => {
        this.comicsData = comics;
      });

    // .subscribe((hero) => {
    //   this.hero = hero;
    //   this.comicsItem = hero.comics.items;
    //   //Necesito usar collectionURI para pasarlo a mi función getComics de mi servicio heroesService
    //   hero.comics.collectionURI;
    // });
  }
}
