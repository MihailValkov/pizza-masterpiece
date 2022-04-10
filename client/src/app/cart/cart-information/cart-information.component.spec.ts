import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartInformationComponent } from './cart-information.component';

describe('CartInformationComponent', () => {
  let component: CartInformationComponent;
  let fixture: ComponentFixture<CartInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
