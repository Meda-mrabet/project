import { TestBed } from '@angular/core/testing';

import { ParticientService } from './particient.service';

describe('ParticientService', () => {
  let service: ParticientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
