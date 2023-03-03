import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FavoritesTableComponent } from "./favorites-table.component";

describe("FavoritesTableComponent", () => {
  let component: FavoritesTableComponent;
  let fixture: ComponentFixture<FavoritesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
