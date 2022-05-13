import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatChipItemComponent } from './mat-chip-item.component';

describe('MatChipItemComponent', () => {
  let component: MatChipItemComponent;
  let fixture: ComponentFixture<MatChipItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatChipItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatChipItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
