import { TestBed } from '@angular/core/testing';

import { CoininfoService } from './coininfo.service';

describe('CoininfoService', () => {
  let service: CoininfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoininfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
