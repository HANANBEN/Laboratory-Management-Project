import { TestBed } from '@angular/core/testing';

import { ContactLaboratoryService } from './contact-laboratory.service';

describe('ContactLaboratoryService', () => {
  let service: ContactLaboratoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactLaboratoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
