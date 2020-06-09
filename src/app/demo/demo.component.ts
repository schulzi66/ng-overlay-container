import { HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgOverlayContainerConfiguration, NgOverlayContainerService } from 'projects/ng-overlay-container/src/public-api';
import { DemoOverlayComponent } from '../demo-overlay.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
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
    public widths = ['300px', '400px', '500px'];

    public selectedHeight = '500px';
    public heights = ['300px', '400px', '500px'];

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

    public panelClass = 'ng-overlay-container';


    constructor(private ngOverlayContainerService: NgOverlayContainerService) {}

    /**
     * Demonstrates how to use the service with a TemplateRef
     * @param content Reference to the ng-template
     */
    public openTemplate(content: TemplateRef<any>): void {
      const ngPopupRef = this.ngOverlayContainerService.open({
        content,
        origin: this.originTemplate.element.nativeElement,
        configuration: {
          panelClass: 'custom-overlay',
        },
        //   configuration: this.overlayConfiguration,
      });

      ngPopupRef.afterClosed$.subscribe((result) => {
        console.log(result);
      });
    }

    /**
     * Demonstrates how to use the service with any component
     * Make sure to include the Component (in this case DemoOverlayComponent) as entryComponent in your module
     */
    public openComponent(): void {
      const ngPopupRef = this.ngOverlayContainerService.open<
        { demoInput: number[] },
        { returnValue: string }
      >({
        content: DemoOverlayComponent,
        data: {
          demoInput: [1, 2, 3, 4],
        },
        origin: this.originComponent.element.nativeElement,
        //   configuration: this.overlayConfiguration,
      });

      ngPopupRef.afterClosed$.subscribe((result) => {
        if (result.data) {
          // this.returnedValue = result.data.returnValue;
        }
      });
    }

    /**
     * Demonstrates how to use the service with a plain text
     */
    public openText(): void {
      const ngPopupRef = this.ngOverlayContainerService.open({
        content:
          'Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀',
        origin: this.originText.element.nativeElement,
        //   configuration: this.overlayConfiguration,
      });

      ngPopupRef.afterClosed$.subscribe((result) => {
        console.log(result);
      });
    }

}
