import { TestBed } from '@angular/core/testing';

import { AddressFormService } from './address-form.service';

describe('AddressFormService', () => {
  let service: AddressFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
