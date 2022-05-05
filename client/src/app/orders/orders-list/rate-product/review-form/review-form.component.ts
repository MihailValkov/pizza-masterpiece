import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { RateProductFormService } from '../rate-product-form.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  form!:FormGroup;

  constructor(private rateProductFormService:RateProductFormService) { 
    this.rateProductFormService.rateForm$.subscribe(form => this.form = form)
  }

  ngOnInit(): void {
  }


}
