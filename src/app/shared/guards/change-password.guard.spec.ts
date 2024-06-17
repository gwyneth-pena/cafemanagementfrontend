import { TestBed } from '@angular/core/testing';

import { ChangePassGuardService, ChangePasswordGuard } from './change-password.guard';

describe('ChangePasswordGuard', () => {
  let guard: typeof ChangePasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePassGuardService, {provide: ChangePasswordGuard, useValue: ChangePasswordGuard}]
    });
    guard = TestBed.inject(ChangePasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
