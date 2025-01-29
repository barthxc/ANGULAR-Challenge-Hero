import { Component, OnInit } from '@angular/core';
import { HeroesServices } from '../../services/heroes.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Comics, ComicsItem, Hero } from '../../interfaces/Hero.interface';

@Component({
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css'],
})
export class HeroPageComponent implements OnInit {
  public hero: Hero | null = null;
  public favHeroes: Hero[] = [];
  public isLoading: boolean = false;
  public comicsItem: ComicsItem[] = [];

  constructor(
    private heroesService: HeroesServices,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.heroesService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => {
        this.hero = hero;
        this.comicsItem = hero.comics.items;
      });
  }
}
