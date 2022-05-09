import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RateProductFormService } from '../../../order-detail/rate-product/rate-product-form.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
})
export class ReviewFormComponent {
  form!: FormGroup;

  constructor(private rateProductFormService: RateProductFormService) {
    this.rateProductFormService.rateForm$.subscribe(
      (form) => (this.form = form)
    );
  }
}
