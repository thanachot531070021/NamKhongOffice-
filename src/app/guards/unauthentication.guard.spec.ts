import { TestBed } from '@angular/core/testing';

import { UnAuthenticationGuard } from './unauthentication.guard';

describe('UnAuthenticationGuard', () => {
  let guard: UnAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
