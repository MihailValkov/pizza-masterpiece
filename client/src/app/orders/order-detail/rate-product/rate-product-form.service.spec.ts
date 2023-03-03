import { TestBed } from "@angular/core/testing";

import { RateProductFormService } from "./rate-product-form.service";

describe("RateProductFormService", () => {
  let service: RateProductFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateProductFormService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
