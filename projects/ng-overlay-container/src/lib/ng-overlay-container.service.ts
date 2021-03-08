import { ConnectionPositionPair, Overlay, OverlayConfig, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import {
  DEFAULT_OVERLAY_CONFIGURATION,
  NgOverlayContainerConfiguration
} from './models/ng-overlay-container-configuration.interface';
import { NgOverlayContainerParameters } from './models/ng-overlay-container-parameters.interface';
import { NgPopoverRef } from './popover-component/ng-popover-reference';
import { NgPopoverComponent } from './popover-component/ng-popover.component';

/**
 * The NgOverlayContainerService is an injectable service to open a {@link NgPopoverComponent} that behaves as a parent
 * where anything from text, component or template can be embedded dynamically.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class NgOverlayContainerService {
  public constructor(private overlay: Overlay, private injector: Injector) {}

  /**
   * Opens an popover relative to the {@param origin} with the provided {@param content}.
   * @param T The data passed into the container to be available in the embedded e.g. component
   * @param R The response data type returned from the afterClosed$ observable when calling close(data?: R)
   * @param content The dynamic content to be rendered: 'template' | 'component' | 'text'
   * @param origin The origin to which the popover is attached. Not needed if used in combination with NgOverlayContainerConfiguration.useGlobalPositionStrategy = true. If the overlay can't be displayed on the screen, fallback positions are used
   * @param data Any data that is needed in the rendered e.g. component accessible from the component constructor via NgPopoverRef (DI)
   * @param configuration Any custom overlay configuration
   * @returns The reference to the NgPopoverRef
   */
  public open<T = any, R = any>({
    content,
    origin,
    data,
    configuration
  }: NgOverlayContainerParameters<T>): NgPopoverRef<T, R> {
    const overlayRef = this.overlay.create(
      this.getOverlayConfig(origin, { ...DEFAULT_OVERLAY_CONFIGURATION, ...configuration })
    );

    if (configuration?.panelClass) {
      overlayRef.addPanelClass(configuration.panelClass);
    }

    const ngPopoverRef = new NgPopoverRef<T, R>(overlayRef, content, data, configuration.isDraggable);

    const injector = this.createInjector(ngPopoverRef, this.injector);
    overlayRef.attach(new ComponentPortal(NgPopoverComponent, null, injector));

    return ngPopoverRef;
  }

  private getOverlayConfig(origin: HTMLElement, configuration: NgOverlayContainerConfiguration): OverlayConfig {
    return new OverlayConfig({
      width: configuration.width,
      height: configuration.height,
      hasBackdrop: configuration.hasBackdrop,
      panelClass: DEFAULT_OVERLAY_CONFIGURATION.panelClass,
      backdropClass: configuration.backdropClass,
      positionStrategy: this.getOverlayPosition(origin, configuration),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

  private getOverlayPosition(origin: HTMLElement, configuration: NgOverlayContainerConfiguration): PositionStrategy {
    const positionStrategy = configuration.useGlobalPositionStrategy
      ? this.overlay
          .position()
          .global()
          .centerHorizontally(configuration.offsetX.toString())
          .centerVertically(configuration.offsetY.toString())
      : this.overlay
          .position()
          .flexibleConnectedTo(origin)
          .withPositions(this.getPositions(configuration))
          .withPush(false);

    return positionStrategy;
  }

  private getPositions(configuration: NgOverlayContainerConfiguration): ConnectionPositionPair[] {
    return [
      {
        originX: configuration.originX,
        originY: configuration.originY,
        overlayX: configuration.overlayX,
        overlayY: configuration.overlayY,
        offsetX: configuration.offsetX,
        offsetY: configuration.offsetY
      }, // Fallback positions if provided position is not possible
      {
        // Bottom
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
      },
      {
        // Right
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center'
      },
      {
        // Left
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center'
      },
      {
        // Top
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      }
    ];
  }

  private createInjector(popoverRef: NgPopoverRef, injector: Injector): PortalInjector {
    const tokens = new WeakMap([[NgPopoverRef, popoverRef]]);
    return new PortalInjector(injector, tokens);
  }
}
