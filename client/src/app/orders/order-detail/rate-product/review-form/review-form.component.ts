import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RateProductFormService } from '../rate-product-form.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
})
export class ReviewFormComponent implements OnDestroy {
  form!: FormGroup;
  subscription!: Subscription;

  constructor(private rateProductFormService: RateProductFormService) {
    this.subscription = this.rateProductFormService.rateForm$.subscribe(
      (form) => (this.form = form)
    );
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
