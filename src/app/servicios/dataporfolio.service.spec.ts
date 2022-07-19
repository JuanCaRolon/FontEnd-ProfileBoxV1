import { TestBed } from '@angular/core/testing';

import { DataporfolioService } from './dataporfolio.service';

describe('DataporfolioService', () => {
  let service: DataporfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataporfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
