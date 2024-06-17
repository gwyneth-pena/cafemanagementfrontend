import { TestBed } from '@angular/core/testing';

import { PermissionGuard } from './permission-guard.guard';
import { MenuService } from '../menu/menu-items';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('PermissionGuardGuard', () => {
  let guard: typeof PermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService, JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, {provide: PermissionGuard, useValue: PermissionGuard}]
    });
    guard = TestBed.inject(PermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
