import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FavHero } from '../../interfaces/FavHero.interface';
import { FavHeroesService } from '../../services/fav-heroes.service';

@Component({
  selector: 'fav-input',
  templateUrl: './fav-input.component.html',
  styleUrls: ['./fav-input.component.css'],
})
export class FavInputComponent implements OnInit {
  constructor(private favHeroesService: FavHeroesService) {}

  public FavCount: number = 0;
  public searchCount: number = 0;

  public searchInput = new FormControl('');

  ngOnInit(): void {
    this.favHeroesService.favHeroes$.subscribe((heroes) => {
      this.searchCount = heroes.length;
    });

    this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.favHeroesService.searchFavHeroes(term!);
      });
  }
}
