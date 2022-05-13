import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductDetailComponent } from './cart-product-detail.component';

describe('CartProductDetailComponent', () => {
  let component: CartProductDetailComponent;
  let fixture: ComponentFixture<CartProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
