import { TestBed } from '@angular/core/testing';

import { NgcRangeService } from './ngc-range.service';

describe('NgcRangeService', () => {
  let service: NgcRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgcRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
