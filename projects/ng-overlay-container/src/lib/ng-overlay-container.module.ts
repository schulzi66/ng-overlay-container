import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgPopoverComponent } from './popover-component/ng-popover.component';

@NgModule({
    imports: [CommonModule, OverlayModule, PortalModule],
    declarations: [NgPopoverComponent],
    exports: [NgPopoverComponent]
})
export class NgOverlayContainerModule {}
