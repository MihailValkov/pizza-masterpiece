import { TestBed } from "@angular/core/testing";

import { UserFormService } from "./user-form.service";

describe("UserFormService", () => {
  let service: UserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFormService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
