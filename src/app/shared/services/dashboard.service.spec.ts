import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('DashboardService', () => {
  let service: DashboardService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DashboardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get dashboard details',()=>{
    const dummyDashboardDetails = {"product":"3","bill":"8","category":"4"};
    

    service.getDashboardDetails().subscribe((response)=>{
      expect(response).toEqual(dummyDashboardDetails)
    });

    const req = httpTestingController.expectOne(`${service.url}/dashboard/details`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyDashboardDetails);
    
  });

});
