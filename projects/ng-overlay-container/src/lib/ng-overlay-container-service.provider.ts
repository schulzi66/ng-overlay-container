import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NgOverlayContainerService } from './ng-overlay-container.service';

export const provideNgOverlayContainer = (): EnvironmentProviders => makeEnvironmentProviders([
  {
    provide: NgOverlayContainerService,
    useClass: NgOverlayContainerService
  }
])
