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

  public FavHeroes: FavHero[] = [];
  public FavCount: number = 0;
  public searchResult: FavHero[] = [];
  public searchCount: number = 0;

  public searchInput = new FormControl('');
  private searchTerm = new Subject<string>();

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.favHeroesService.searchFavHeroes(term!);
      });
  }
}
