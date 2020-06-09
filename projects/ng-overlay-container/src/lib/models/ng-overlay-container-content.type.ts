import { TemplateRef, Type } from '@angular/core';

/**
 * Supported types of embedded content
 */
export type NgOverlayContainerContent = TemplateRef<any> | Type<any> | string;
