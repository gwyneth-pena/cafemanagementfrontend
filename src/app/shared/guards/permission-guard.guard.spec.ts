import { TestBed } from '@angular/core/testing';

import { PermissionGuardGuard } from './permission-guard.guard';

describe('PermissionGuardGuard', () => {
  let guard: PermissionGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermissionGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
