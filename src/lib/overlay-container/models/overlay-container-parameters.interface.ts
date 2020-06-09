import { OverlayContainerContent } from './overlay-container-content.type';
import { OverlayContainerConfiguration } from './overlay-container-configuration.interface';

/**
 * Parameter structure to open an overlay container
 */
export interface OverlayContainerParameters<T> {
    origin: HTMLElement;
    content: OverlayContainerContent;
    data?: T;
    configuration?: OverlayContainerConfiguration;
}
