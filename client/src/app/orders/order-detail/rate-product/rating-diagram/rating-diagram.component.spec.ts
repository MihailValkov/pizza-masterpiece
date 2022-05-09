import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingDiagramComponent } from './rating-diagram.component';

describe('RatingDiagramComponent', () => {
  let component: RatingDiagramComponent;
  let fixture: ComponentFixture<RatingDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
