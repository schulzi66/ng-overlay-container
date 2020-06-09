/**
 * Parameter structure for closing a popover with data
 */
export interface NgPopoverCloseEvent<R> {
    type: NgPopoverCloseType;
    data: R;
}

/**
 * Type of close interaction
 */
export type NgPopoverCloseType = 'backdropClick' | 'close';
