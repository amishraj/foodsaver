import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Output() ratingSelected = new EventEmitter<number>();

  constructor() { }

  onRatingChange(rating: number): void {
    this.ratingSelected.emit(rating);
  }
}
