import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Input() position: 'vertical' | 'horizontal' | 'vertical-center' = 'horizontal';
  @Input() showRatingInfo = false;

  constructor() {}
}
