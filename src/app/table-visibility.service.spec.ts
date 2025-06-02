import { TestBed } from '@angular/core/testing';

import { TableVisibilityService } from './table-visibility.service';

describe('TableVisibilityService', () => {
  let service: TableVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
