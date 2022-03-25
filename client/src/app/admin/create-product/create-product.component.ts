import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      imageUrl: [''],
    });
  }

  ngOnInit(): void {}

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const file: File | null = element.files && element.files[0];
    const formData = new FormData();
    if (!file?.type.includes('image')) {
      return this.form.get('imageUrl')?.setErrors({ type: true });
    }
    if (file) {
      formData.append('image', file);
      this.http
        .post('/uploads/products', formData)
        .subscribe((x) => console.log(x));
    }
  }
  uploadHandler(inputRef: HTMLInputElement) {
    inputRef.click();
  }
}
