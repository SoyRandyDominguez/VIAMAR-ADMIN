import { TestBed } from '@angular/core/testing';

import { LibrariesService } from './libraries-service.service';

describe('LibrariesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibrariesService = TestBed.get(LibrariesService);
    expect(service).toBeTruthy();
  });
});
