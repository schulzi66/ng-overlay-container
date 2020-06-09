import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { OverlayContainerContent } from '../models/overlay-container-content.type';
import { PopoverRenderMethod } from './../models/popover-render-method.type';
import { PopoverRef } from './popover-reference';

/**
 * The host component that embeds the provided content
 */
@Component({
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NgPopoverComponent implements OnInit {
    public renderMethod: PopoverRenderMethod;
    public content: OverlayContainerContent;
    public context: { close: any };

    public constructor(private popoverRef: PopoverRef) {}

    ngOnInit() {
        this.content = this.popoverRef.content;

        if (typeof this.content === 'string') {
            this.renderMethod = 'text';
        } else if (this.content instanceof TemplateRef) {
            this.renderMethod = 'template';
            this.context = {
                close: this.popoverRef.close.bind(this.popoverRef)
            };
        } else {
            this.renderMethod = 'component';
        }
    }
}
