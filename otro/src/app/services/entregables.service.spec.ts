import { TestBed } from '@angular/core/testing';

import { EntregablesService } from './entregables.service';

describe('EntregablesService', () => {
  let service: EntregablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
