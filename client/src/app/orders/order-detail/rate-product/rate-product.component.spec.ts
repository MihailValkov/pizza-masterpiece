import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateProductComponent } from './rate-product.component';

describe('RateProductComponent', () => {
  let component: RateProductComponent;
  let fixture: ComponentFixture<RateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
