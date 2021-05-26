import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { NgOverlayContainerContent } from '../models/ng-overlay-container-content.type';
import { NgPopoverCloseEvent, NgPopoverCloseType } from '../models/ng-popover-close-event.interface';

/**
 * The reference to the popover container.
 * @param T The data passed into the container to be available in the embedded e.g. component
 * @param R The response data type returned from the afterClosed$ observable when calling close(data?: R)
 */
export class NgPopoverRef<T = any, R = any> {
  private afterClosed = new Subject<NgPopoverCloseEvent<R>>();
  private initialOverlayConfig: OverlayConfig;
  private toggled: boolean;

  /**
   * Observable to retrieve the returned data
   */
  public afterClosed$ = this.afterClosed.asObservable();

  constructor(
    public overlay: Overlay,
    public overlayRef: OverlayRef,
    public content: NgOverlayContainerContent,
    public data: T,
    public isDraggable?: boolean,
    public disableBackdropClose?: boolean
  ) {
    this.initialOverlayConfig = overlayRef.getConfig();
    this.toggled = false;
    if (!disableBackdropClose) {
      overlayRef.backdropClick().subscribe(() => this._close('backdropClick', null));
    }
  }

  /**
   * Sets new width and/or height values. If omitted the current value is used
   * @param width The new width
   * @param height The new height
   */
  public resize(width?: string, height?: string): void {
    const currentConfig = this.overlayRef.getConfig();
    this.overlayRef.updateSize({ width: width ?? currentConfig.width, height: height ?? currentConfig.height });
  }

  /**
   * Toggle maximize of the overlay
   */
  public toggleMaximize(): void {
    if (!this.toggled) {
      this.overlayRef.updatePositionStrategy(
        this.overlay
          .position()
          .flexibleConnectedTo({} as HTMLElement)
          .withPositions([
            {
              originX: 'center',
              originY: 'bottom',
              overlayX: 'center',
              overlayY: 'top',
              offsetX: 0,
              offsetY: 0
            }
          ])
      );
      this.overlayRef.updateSize({ width: '100%', height: '100%' });
    } else {
      this.overlayRef.updateSize({
        width: this.initialOverlayConfig.width,
        height: this.initialOverlayConfig.height
      });
      this.overlayRef.updatePositionStrategy(this.initialOverlayConfig.positionStrategy);
    }
    this.toggled = !this.toggled;
  }

  /**
   * Closes the container e.g. on a button click
   * @param data The data returned when closing the container
   */
  public close(data?: R): void {
    this._close('close', data);
  }

  private _close(type: NgPopoverCloseType, data: R): void {
    this.overlayRef.dispose();
    this.afterClosed.next({
      type,
      data
    });
    this.afterClosed.complete();
  }
}
