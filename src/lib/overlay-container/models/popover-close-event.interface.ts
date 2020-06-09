/**
 * Parameter structure for closing a popover with data
 */
export interface PopoverCloseEvent<R> {
    type: PopoverCloseType;
    data: R;
}

/**
 * Type of close interaction
 */
export type PopoverCloseType = 'backdropClick' | 'close';
