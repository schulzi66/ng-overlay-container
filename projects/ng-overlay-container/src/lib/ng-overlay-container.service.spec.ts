import { TestBed } from '@angular/core/testing';

import { NgOverlayContainerService } from './ng-overlay-container.service';

describe('NgOverlayContainerService', () => {
  let service: NgOverlayContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgOverlayContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
