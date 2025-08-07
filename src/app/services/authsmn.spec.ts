import { TestBed } from '@angular/core/testing';

import { Authsmn } from './authsmn';

describe('Authsmn', () => {
  let service: Authsmn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authsmn);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
