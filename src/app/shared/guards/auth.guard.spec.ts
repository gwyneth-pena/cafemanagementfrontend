import { TestBed } from '@angular/core/testing';

import { AuthGuard, AuthService } from './auth.guard';
import { DashboardGuard } from './dashboard.guard';
import { UserService } from '../services/user.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('AuthGuard', () => {
  let guard: typeof AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, {provide: AuthGuard, useValue: AuthGuard}, UserService, JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
