import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserTableDetailComponent } from "./user-detail.component";

describe("UserTableDetailComponent", () => {
  let component: UserTableDetailComponent;
  let fixture: ComponentFixture<UserTableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
