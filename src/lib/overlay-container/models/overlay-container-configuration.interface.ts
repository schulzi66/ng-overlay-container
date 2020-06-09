import { HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';

/**
 * Configuration for the overlay container
 */
export interface OverlayContainerConfiguration {
    width?: string;
    height?: string;
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    originX?: HorizontalConnectionPos;
    originY?: VerticalConnectionPos;
    overlayX?: HorizontalConnectionPos;
    overlayY?: VerticalConnectionPos;
    offsetX?: number;
    offsetY?: number;
}

/**
 * Default overlay container configuration
 */
export const DEFAULT_OVERLAY_CONFIGURATION: OverlayContainerConfiguration = {
    hasBackdrop: true,
    backdropClass: 'cdk-overlay-transparent-backdrop',
    panelClass: 'ng-overlay-container',
    width: '400px',
    height: '500px',
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetX: 0,
    offsetY: 10
};
