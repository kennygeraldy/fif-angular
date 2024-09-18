import { TestBed } from '@angular/core/testing';

import { StatuspaymentService } from '../../service/status-payment/statuspayment.service';

describe('StatuspaymentService', () => {
  let service: StatuspaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatuspaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
