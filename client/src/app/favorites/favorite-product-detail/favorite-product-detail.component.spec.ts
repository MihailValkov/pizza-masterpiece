import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FavoriteProductDetailComponent } from "./favorite-product-detail.component";

describe("FavoriteProductDetailComponent", () => {
  let component: FavoriteProductDetailComponent;
  let fixture: ComponentFixture<FavoriteProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteProductDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
