import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {
  @Input() rating = 0;
  @Input() showRatingInfo = false;

  constructor() {}

  ngOnInit(): void {}

  getRatingText(): string {
    const transformedRating = (this.rating / 20 || 0).toFixed(1);
    return `( ${transformedRating} / 5.0 )`;
  }
}
