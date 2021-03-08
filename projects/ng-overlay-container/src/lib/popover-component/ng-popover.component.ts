import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgOverlayContainerContent } from '../models/ng-overlay-container-content.type';
import { NgPopoverRenderMethod } from '../models/ng-popover-render-method.type';
import { NgPopoverRef } from './ng-popover-reference';

/**
 * The host component that embeds the provided content
 */
@Component({
    templateUrl: './ng-popover.component.html',
    styleUrls: ['./ng-popover.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NgPopoverComponent implements OnInit {
    public ngRenderMethod: NgPopoverRenderMethod;
    public content: NgOverlayContainerContent;
    public context: { close: any };
    public isDraggable?: boolean;

    public constructor(private ngPopoverRef: NgPopoverRef) {}

    ngOnInit() {
        this.content = this.ngPopoverRef.content;
        this.isDraggable = this.ngPopoverRef.isDraggable;

        if (typeof this.content === 'string') {
            this.ngRenderMethod = 'text';
        } else if (this.content instanceof TemplateRef) {
            this.ngRenderMethod = 'template';
            this.context = {
                close: this.ngPopoverRef.close.bind(this.ngPopoverRef)
            };
        } else {
            this.ngRenderMethod = 'component';
        }
    }
}
