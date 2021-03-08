import { HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';

/**
 * Configuration for the overlay container
 */
export interface NgOverlayContainerConfiguration {
    width?: string;
    height?: string;
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    useGlobalPositionStrategy?: boolean;
    originX?: HorizontalConnectionPos;
    originY?: VerticalConnectionPos;
    overlayX?: HorizontalConnectionPos;
    overlayY?: VerticalConnectionPos;
    offsetX?: number;
    offsetY?: number;
    isDraggable?: boolean;
}

/**
 * Default overlay container configuration
 */
export const DEFAULT_OVERLAY_CONFIGURATION: NgOverlayContainerConfiguration = {
    hasBackdrop: true,
    backdropClass: 'cdk-overlay-transparent-backdrop',
    panelClass: 'ng-overlay-container',
    useGlobalPositionStrategy: false,
    width: '400px',
    height: '500px',
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetX: 0,
    offsetY: 10,
    isDraggable: false
};
