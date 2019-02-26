import { TestBed } from '@angular/core/testing';

import { PairwiseService } from './pairwise.service';

describe('PairwiseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PairwiseService = TestBed.get(PairwiseService);
    expect(service).toBeTruthy();
  });
});
