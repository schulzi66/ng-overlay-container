import { ConnectionPositionPair, HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';

/**
 * Configuration for the overlay container
 */
export interface NgOverlayContainerConfiguration {
  /**
   * Width of the overlay.
   */
  width?: string;

  /**
   * Height of the overlay.
   */
  height?: string;

  /**
   * The min-width of the overlay panel. If a number is provided, pixel units are assumed.
   */
  minWidth?: number | string;

  /**
   * The min-height of the overlay panel. If a number is provided, pixel units are assumed.
   */
  minHeight?: number | string;

  /**
   * Custom class for the overlay pane.
   *
   * Default: ng-overlay-container
   */
  panelClass?: string;

  /**
   * Whether the dialog has a backdrop.
   *
   * Default: true
   */
  hasBackdrop?: boolean;

  /**
   * Custom class for the backdrop.
   *
   * Default: cdk-overlay-transparent-backdrop
   */
  backdropClass?: string;

  /**
   * Wether the overlay should be positioned globaly on the screen.
   *
   * Default: false
   */
  useGlobalPositionStrategy?: boolean;

  /**
   * Horizontal dimension of a connection point on the perimeter of the origin.
   *
   * Default: 'center'
   */
  originX?: HorizontalConnectionPos;

  /**
   * Vertical dimension of a connection point on the perimeter of the origin.
   *
   * Default: 'bottom'
   */
  originY?: VerticalConnectionPos;

  /**
   * Horizontal dimension of a connection point on the perimeter of the overlay element.
   *
   * Default: 'center'
   */
  overlayX?: HorizontalConnectionPos;

  /**
   * Vertical dimension of a connection point on the perimeter of the overlay element.
   *
   * Default: 'top'
   */
  overlayY?: VerticalConnectionPos;

  /**
   * Offset along the X axis in px.
   *
   * Default: 0
   */
  offsetX?: number;

  /**
   * Offset along the Y axis in px.
   *
   * Default: 10
   */
  offsetY?: number;

  /**
   * Wether the overlay is draggable.
   *
   * Default: false
   */
  isDraggable?: boolean;

  /**
   * Wether the overlay is resizable.
   *
   * Default: true
   */
  isResizable?: boolean;

  /**
   * Wether the overlay should close when clicking outside.
   *
   * Default: false
   */
  disableBackdropClose?: boolean;

  /**
   * Custom fallback positions for `useGlobalPositionStrategy: false` if provied position is not possible to display.
   *
   * Default: []
   */
  fallbackPositions?: ConnectionPositionPair[]
}

/**
 * Default overlay container configuration
 */
export const DEFAULT_OVERLAY_CONFIGURATION: NgOverlayContainerConfiguration = {
  hasBackdrop: true,
  backdropClass: 'cdk-overlay-transparent-backdrop',
  panelClass: 'ng-overlay-container',
  useGlobalPositionStrategy: false,
  originX: 'center',
  originY: 'bottom',
  overlayX: 'center',
  overlayY: 'top',
  offsetX: 0,
  offsetY: 10,
  isDraggable: false,
  isResizable: true,
  disableBackdropClose: false,
  fallbackPositions: []
};
