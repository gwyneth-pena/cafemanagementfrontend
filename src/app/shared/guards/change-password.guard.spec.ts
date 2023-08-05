import { TestBed } from '@angular/core/testing';

import { ChangePasswordGuard } from './change-password.guard';

describe('ChangePasswordGuard', () => {
  let guard: ChangePasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChangePasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
