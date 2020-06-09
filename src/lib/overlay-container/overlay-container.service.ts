import { ConnectionPositionPair, Overlay, OverlayConfig, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DEFAULT_OVERLAY_CONFIGURATION, OverlayContainerConfiguration } from './models/overlay-container-configuration.interface';
import { OverlayContainerParameters } from './models/overlay-container-parameters.interface';
import { PopoverRef } from './popover-component/popover-reference';
import { NgPopoverComponent } from './popover-component/popover.component';

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
     * @param origin The origin to which the popover is attached
     * @param content The dynamic content to be rendered: 'template' | 'component' | 'text'
     * @param data Any data that is needed in the rendered e.g. component accessible from the component constructor via the PopoverRef (DI)
     * @param configuration Any custom overlay configuration
     * @returns The reference to the PopoverRef
     */
    public open<T = any, R = any>({
        origin,
        content,
        data,
        configuration
    }: OverlayContainerParameters<T>): PopoverRef<T, R> {
        const overlayRef = this.overlay.create(this.getOverlayConfig(origin, configuration));

        overlayRef.addPanelClass([DEFAULT_OVERLAY_CONFIGURATION.panelClass, configuration?.panelClass]);

        const popoverRef = new PopoverRef<T, R>(overlayRef, content, data);

        const injector = this.createInjector(popoverRef, this.injector);
        overlayRef.attach(new ComponentPortal(NgPopoverComponent, null, injector));

        return popoverRef;
    }

    private getOverlayConfig(origin: HTMLElement, configuration: OverlayContainerConfiguration): OverlayConfig {
        configuration = { ...DEFAULT_OVERLAY_CONFIGURATION, ...configuration };
        return new OverlayConfig({
            width: configuration.width,
            height: configuration.height,
            hasBackdrop: configuration.hasBackdrop,
            backdropClass: configuration.backdropClass,
            positionStrategy: this.getOverlayPosition(origin, configuration),
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });
    }

    private getOverlayPosition(origin: HTMLElement, configuration: OverlayContainerConfiguration): PositionStrategy {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(origin)
            .withPositions(this.getPositions(configuration))
            .withPush(false);

        return positionStrategy;
    }

    private getPositions(configuration: OverlayContainerConfiguration): ConnectionPositionPair[] {
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

    private createInjector(popoverRef: PopoverRef, injector: Injector): PortalInjector {
        const tokens = new WeakMap([[PopoverRef, popoverRef]]);
        return new PortalInjector(injector, tokens);
    }
}
