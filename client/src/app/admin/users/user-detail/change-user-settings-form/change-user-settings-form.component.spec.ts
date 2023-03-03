import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChangeUserSettingsFormComponent } from "./change-user-settings-form.component";

describe("ChangeUserSettingsFormComponent", () => {
  let component: ChangeUserSettingsFormComponent;
  let fixture: ComponentFixture<ChangeUserSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeUserSettingsFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
