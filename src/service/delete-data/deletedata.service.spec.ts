import { TestBed } from '@angular/core/testing';

import { DeletedataService } from '../delete-data/deletedata.service';

describe('DeletedataService', () => {
  let service: DeletedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
