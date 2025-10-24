import { HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgOverlayContainerConfiguration, NgOverlayContainerService } from 'ng-overlay-container';
import { DemoOverlayComponent } from '../demo-overlay.component';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    imports: [MatRadioGroup, FormsModule, NgFor, MatRadioButton, MatButton, MatFormField, MatLabel, MatSelect, MatOption]
})
export class DemoComponent {
  @ViewChild('originTemplate', { static: false, read: ViewContainerRef })
  originTemplate: ViewContainerRef;
  @ViewChild('originComponent', { static: false, read: ViewContainerRef })
  originComponent: ViewContainerRef;
  @ViewChild('originText', { static: false, read: ViewContainerRef })
  originText: ViewContainerRef;

  public overlayConfiguration: NgOverlayContainerConfiguration;

  public selectedWidth = '400px';
  public widths = ['undefined', '300px', '400px', '500px', '90vw', '100vw', '100%'];

  public selectedHeight = '300px';
  public heights = ['undefined', '300px', '400px', '500px', '90vh', '100vh', '100%'];

  public selectedMinWidth = undefined;
  public minWidths = ['300px', '400px', '500px', '90vw', '100vw', '100%'];

  public selectedMinHeight = undefined;
  public minHeights = ['300px', '400px', '500px', '90vw', '100vw', '100%'];

  public selectedOriginX: HorizontalConnectionPos = 'center';
  public originXs = ['start', 'center', 'end'];

  public selectedOriginY: VerticalConnectionPos = 'bottom';
  public originYs = ['top', 'center', 'bottom'];

  public selectedOverlayX: HorizontalConnectionPos = 'center';
  public overlayXs = ['start', 'center', 'end'];

  public selectedOverlayY: VerticalConnectionPos = 'top';
  public overlayYs = ['top', 'center', 'bottom'];

  public selectedOffsetX = '0';
  public offsetXs = ['-20', '-10', '0', '10', '20'];

  public selectedOffsetY = '10';
  public offsetYs = ['-20', '-10', '0', '10', '20'];

  public selectedHasBackdrop = 'true';
  public hasBackdrops = ['true', 'false'];

  public selectedBackdropClass = 'cdk-overlay-transparent-backdrop';
  public backdropClasses = ['cdk-overlay-transparent-backdrop', 'cdk-overlay-dark-backdrop'];

  public customPanelClass = 'custom-panel';

  public selectedUseGlobalPositionStrategy = 'false';
  public useGlobalPositionStrategy = ['true', 'false'];

  public selectedIsDraggable = 'false';
  public isDraggable = ['true', 'false'];

  public selectedIsResizable = 'true';
  public isResizable = ['true', 'false'];

  public selectedDisableBackdropClose = 'false';
  public disableBackdropClose = ['true', 'false'];

  public selectedCommonPosition = 'bottom';
  public commonPositions = ['bottom', 'right', 'left', 'top', 'overlay'];

  constructor(private ngOverlayContainerService: NgOverlayContainerService) {
    this.updateConfig();
  }

  public returnedValue: string;

  public updateConfig(): void {
    this.overlayConfiguration = {
      hasBackdrop: /true/i.test(this.selectedHasBackdrop),
      backdropClass: this.selectedBackdropClass,
      panelClass: this.customPanelClass,
      useGlobalPositionStrategy: /true/i.test(this.selectedUseGlobalPositionStrategy),
      width: this.selectedWidth,
      height: this.selectedHeight,
      minWidth: this.selectedMinWidth,
      minHeight: this.selectedMinHeight,
      originX: this.selectedOriginX,
      originY: this.selectedOriginY,
      overlayX: this.selectedOverlayX,
      overlayY: this.selectedOverlayY,
      offsetX: Number(this.selectedOffsetX),
      offsetY: Number(this.selectedOffsetY),
      isDraggable: /true/i.test(this.selectedIsDraggable),
      isResizable: /true/i.test(this.selectedIsResizable),
      disableBackdropClose: /true/i.test(this.selectedDisableBackdropClose)
    };
  }

  public updateCommonPosition(): void {
    this.selectedWidth = '400px';
    this.selectedHeight = '300px';
    this.selectedUseGlobalPositionStrategy = 'false';
    switch (this.selectedCommonPosition) {
      case 'bottom':
        this.selectedOriginX = 'center';
        this.selectedOriginY = 'bottom';
        this.selectedOverlayX = 'center';
        this.selectedOverlayY = 'top';
        break;
      case 'right':
        this.selectedOriginX = 'end';
        this.selectedOriginY = 'center';
        this.selectedOverlayX = 'start';
        this.selectedOverlayY = 'center';
        break;
      case 'left':
        this.selectedOriginX = 'start';
        this.selectedOriginY = 'center';
        this.selectedOverlayX = 'end';
        this.selectedOverlayY = 'center';
        break;
      case 'top':
        this.selectedOriginX = 'center';
        this.selectedOriginY = 'top';
        this.selectedOverlayX = 'center';
        this.selectedOverlayY = 'bottom';
        break;
      case 'overlay':
        this.selectedWidth = '90vw';
        this.selectedHeight = '90vh';
        this.selectedUseGlobalPositionStrategy = 'true';
    }
    this.updateConfig();
  }

  /**
   * Demonstrates how to use the service with a TemplateRef
   * @param content Reference to the ng-template
   */
  public openTemplate(content: TemplateRef<any>): void {
    const ngPopoverRef = this.ngOverlayContainerService.open<string, { id: number }>({
      content,
      data: 'Demo Dummy',
      origin: this.originTemplate.element.nativeElement,
      configuration: this.overlayConfiguration
    });

    ngPopoverRef.afterClosed$.subscribe((result) => {
      console.log('Returned value:');
      console.log(result);
    });
  }

  /**
   * Demonstrates how to use the service with any component
   * Make sure to include the Component (in this case DemoOverlayComponent) as entryComponent in your module
   */
  public openComponent(): void {
    const ngPopoverRef = this.ngOverlayContainerService.open<{ demoInput: number[] }, { returnValue: string }>({
      content: DemoOverlayComponent,
      data: {
        demoInput: [1, 2, 3, 4]
      },
      origin: this.originComponent.element.nativeElement,
      configuration: this.overlayConfiguration
    });

    ngPopoverRef.afterClosed$.subscribe((result) => {
      if (result.data) {
        this.returnedValue = result.data.returnValue;
      }
    });
  }

  /**
   * Demonstrates how to use the service with a plain text
   */
  public openText(): void {
    const ngPopoverRef = this.ngOverlayContainerService.open({
      content: 'Hello World 🌍🚀',
      origin: this.originText.element.nativeElement,
      configuration: this.overlayConfiguration
    });

    ngPopoverRef.afterClosed$.subscribe((result) => {
      console.log('Returned value:');
      console.log(result);
    });
  }

  /**
   * Demonstrates ho to use the service to open the overlay unrelated to any origin element by using `NgOverlayContainerConfiguration.useGlobalPositionStrategy = true`
   */
  public openWithoutOrigin(): void {
    const ngPopoverRef = this.ngOverlayContainerService.open({
      content: 'Demonstration Centered',
      configuration: { useGlobalPositionStrategy: true }
    });
  }
}
