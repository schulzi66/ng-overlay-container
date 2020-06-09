import { TemplateRef, Type } from '@angular/core';

/**
 * Supported types of embedded content
 */
export type OverlayContainerContent = TemplateRef<any> | Type<any> | string;
