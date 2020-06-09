import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgOverlayContainerService } from './overlay-container.service';

describe('NgOverlayContainerService', () => {
    let service: NgOverlayContainerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [OverlayModule],
            providers: [NgOverlayContainerService, Overlay, Injector]
        });
        service = TestBed.get(NgOverlayContainerService);
    });

    it('should created', () => {
        expect(service).toBeTruthy();
    });
});
