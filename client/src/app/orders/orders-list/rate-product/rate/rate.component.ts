import { Component, OnInit } from '@angular/core';
import { RateProductFormService } from '../rate-product-form.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
})
export class RateComponent implements OnInit {
  ids = [5, 4, 3, 2, 1];
  constructor(private rateProductFormService: RateProductFormService) {}

  ngOnInit(): void {}

  onSelectRating(rating: number) {
    this.rateProductFormService.setRating(rating);
  }
}
