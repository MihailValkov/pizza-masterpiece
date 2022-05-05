import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramItemComponent } from './diagram-item.component';

describe('DiagramItemComponent', () => {
  let component: DiagramItemComponent;
  let fixture: ComponentFixture<DiagramItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
