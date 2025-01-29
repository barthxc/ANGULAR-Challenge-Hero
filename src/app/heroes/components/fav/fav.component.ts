import { Component, Input } from '@angular/core';

@Component({
  selector: 'heroes-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css'],
})
export class FavComponent {
  @Input() isMarked: boolean = false;
}
