import { NgOverlayContainerConfiguration } from './ng-overlay-container-configuration.interface';
import { NgOverlayContainerContent } from './ng-overlay-container-content.type';

/**
 * Parameter structure to open an overlay container
 */
export interface NgOverlayContainerParameters<T> {
    content: NgOverlayContainerContent;
    origin?: HTMLElement;
    data?: T;
    configuration?: NgOverlayContainerConfiguration;
}
