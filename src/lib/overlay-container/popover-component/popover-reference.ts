import { Subject } from 'rxjs';
import { PopoverCloseEvent, PopoverCloseType } from '../models/popover-close-event.interface';
import { OverlayRef } from '@angular/cdk/overlay';
import { OverlayContainerContent } from '../models/overlay-container-content.type';

/**
 * The reference to the popover container.
 * @param T The data passed into the container to be available in the embedded e.g. component
 * @param R The response data type returned from the afterClosed$ observable when calling close(data?: R)
 */
export class PopoverRef<T = any, R = any> {
    private afterClosed = new Subject<PopoverCloseEvent<R>>();

    /**
     * Observable to retrieve the returned data
     */
    public afterClosed$ = this.afterClosed.asObservable();

    constructor(public overlay: OverlayRef, public content: OverlayContainerContent, public data: T) {
        overlay.backdropClick().subscribe(() => this._close('backdropClick', null));
    }

    /**
     * Closes the container e.g. on a button click
     * @param data The data returned when closing the container
     */
    public close(data?: R): void {
        this._close('close', data);
    }

    private _close(type: PopoverCloseType, data: R): void {
        this.overlay.dispose();
        this.afterClosed.next({
            type,
            data
        });
        this.afterClosed.complete();
    }
}
