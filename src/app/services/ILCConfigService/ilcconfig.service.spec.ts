import { TestBed } from '@angular/core/testing';

import { ILCconfigService } from './ilcconfig.service';

describe('ILCconfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ILCconfigService = TestBed.get(ILCconfigService);
    expect(service).toBeTruthy();
  });
});
