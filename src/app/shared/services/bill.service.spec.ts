import { TestBed } from '@angular/core/testing';

import { BillService } from './bill.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BillService', () => {
  let service: BillService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
