import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Input() position: 'vertical' | 'horizontal' = 'horizontal';
  @Input() showRatingInfo = false;

  constructor() {}

  getRatingText(): string {
    const transformedRating = (this.rating / 20 || 0).toFixed(1);
    return `( ${transformedRating} / 5.0 )`;
  }
}
