import { TestBed } from '@angular/core/testing';

import { DependencyCheckService } from './dependency-check.service';

describe('DependencyCheckService', () => {
  let service: DependencyCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependencyCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
