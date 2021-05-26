import { NgPopoverComponent } from './popover-component/ng-popover.component';
import { TestBed } from '@angular/core/testing';
import {
  Overlay,
  OverlayModule,
  FlexibleConnectedPositionStrategy,
  GlobalPositionStrategy
} from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { Injector } from '@angular/core';
import { NgOverlayContainerService } from './ng-overlay-container.service';
import { NgOverlayContainerParameters } from './models/ng-overlay-container-parameters.interface';
import { DEFAULT_OVERLAY_CONFIGURATION, NgOverlayContainerConfiguration } from './models/ng-overlay-container-configuration.interface';

describe('NgOverlayContainerService', () => {
  let service: NgOverlayContainerService;
  let overlay: Overlay;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule, DragDropModule],
      declarations: [NgPopoverComponent],
      providers: [NgOverlayContainerService, Overlay, Injector]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [NgPopoverComponent]
      }
    });
    service = TestBed.get(NgOverlayContainerService);
    overlay = TestBed.get(Overlay);
  });

  it('should create PopoverRef correctly', () => {
    const spy = spyOn(overlay, 'create').and.callThrough();
    const params = {
      origin: {} as HTMLElement,
      content: 'Blubb',
      data: [1, 2, 3, 4]
    } as NgOverlayContainerParameters<any>;

    const popoverRef = service.open(params);

    const actualConfig = popoverRef.overlay.getConfig();

    expect(spy).toHaveBeenCalled();
    expect(popoverRef.content).toBe('Blubb');
    expect(popoverRef.data).toEqual([1, 2, 3, 4]);
    expect(actualConfig.hasBackdrop).toBe(DEFAULT_OVERLAY_CONFIGURATION.hasBackdrop);
    expect(actualConfig.width).toBe(DEFAULT_OVERLAY_CONFIGURATION.width);
    expect(actualConfig.height).toBe(DEFAULT_OVERLAY_CONFIGURATION.height);
    expect(actualConfig.backdropClass).toBe(DEFAULT_OVERLAY_CONFIGURATION.backdropClass);
    expect(actualConfig.panelClass).toBe(DEFAULT_OVERLAY_CONFIGURATION.panelClass);
    expect(actualConfig.positionStrategy instanceof FlexibleConnectedPositionStrategy).toBe(true);
  });

  it('should use provided configuration', () => {
    const config = {
      width: '100px',
      height: '200px',
      hasBackdrop: false,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: 'custom-class',
      useGlobalPositionStrategy: true
    } as NgOverlayContainerConfiguration;

    const spy = spyOn(overlay, 'create').and.callThrough();
    const params = {
      origin: {} as HTMLElement,
      content: 'Blubb',
      configuration: config
    } as NgOverlayContainerParameters<any>;

    const popoverRef = service.open(params);

    const actualConfig = popoverRef.overlay.getConfig();

    expect(spy).toHaveBeenCalled();
    expect(actualConfig.hasBackdrop).toBeFalsy();
    expect(actualConfig.width).toBe('100px');
    expect(actualConfig.height).toBe('200px');
    expect(actualConfig.backdropClass).toBe('cdk-overlay-dark-backdrop');
    expect(((popoverRef.overlay as any)._pane.classList as DOMTokenList).contains('ng-overlay-container')).toBe(true);
    expect(((popoverRef.overlay as any)._pane.classList as DOMTokenList).contains('custom-class')).toBe(true);
    expect(actualConfig.positionStrategy instanceof GlobalPositionStrategy).toBe(true);
  });
});
