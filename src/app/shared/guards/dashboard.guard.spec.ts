import { TestBed } from '@angular/core/testing';

import { DashboardGuard } from './dashboard.guard';
import { DashboardService } from '../services/dashboard.service';

describe('DashboardGuard', () => {
  let guard: typeof DashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[DashboardService, {provide:DashboardGuard, useValue:DashboardGuard}]
    });
    guard = TestBed.inject(DashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
