import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
} from '@angular/forms';
import { ProductFormService } from '../product-form.service';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.css'],
})
export class ExpansionPanelComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() iconName!: string;
  @Input() formArrayName!: 'sizes' | 'doughs' | 'extras' | 'ingredients';

  form!: FormGroup;
  constructor(private productFormService: ProductFormService) {}

  ngOnInit(): void {
    this.productFormService.form$.subscribe((form) => {
      this.form = form;
    });
  }

  get getFormArray(): FormArray {
    return this.form.get(this.formArrayName) as FormArray;
  }
  
  get controlNames(): string[] {
    return Object.keys((this.getFormArray.controls[0] as FormGroup).controls);
  }

  getErrorMessage(controlName: string, index: number): string | null {
    const control = (this.getFormArray.controls[index] as FormGroup).controls[
      controlName
    ];
    const errors = control.errors;
    if (errors) {
    if (errors['required']) {
        return `${controlName} is required`;
      }
      if (errors['minlength']) {
        return `${controlName} should be at least ${errors['minlength'].requiredLength} characters long`;
      }
      if (errors['min']) {
        return `${controlName} should be minimum ${errors['min'].min}`;
      }
    }
    return null;
  }

  add(type: 'sizes' | 'doughs' | 'extras' | 'ingredients') {
    this.productFormService.addControl(type);
  }

  remove(index: number, type: 'sizes' | 'doughs' | 'extras' | 'ingredients') {
    this.productFormService.removeControl(index, type);
  }
}
