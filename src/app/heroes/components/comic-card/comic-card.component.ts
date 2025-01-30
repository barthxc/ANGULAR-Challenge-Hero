import { Component, Input } from '@angular/core';
import { ComicsData } from '../../interfaces/Comics.interface';

@Component({
  selector: 'comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.css'],
})
export class ComicCardComponent {
  constructor() {}

  @Input() comicsData!: ComicsData[];
}
