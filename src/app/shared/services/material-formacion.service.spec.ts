import { TestBed } from '@angular/core/testing';

import { MaterialFormacionService } from './material-formacion.service';

describe('MaterialFormacionService', () => {
  let service: MaterialFormacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialFormacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
