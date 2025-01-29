import { Component, Input } from '@angular/core';
import { Comics, ComicsItem } from '../../interfaces/Hero.interface';

@Component({
  selector: 'comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.css'],
})
export class ComicCardComponent {
  constructor() {}

  @Input() comicsItem!: ComicsItem[];
}
