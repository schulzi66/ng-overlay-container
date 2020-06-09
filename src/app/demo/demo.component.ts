import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgOverlayContainerService } from 'src/lib/overlay-container/public-api';
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

    constructor(private overlayContainerService: NgOverlayContainerService) {}

    /**
     * Demonstrates how to use the service with a TemplateRef
     * @param content Reference to the ng-template
     */
    public openTemplate(content: TemplateRef<any>): void {
      const popupRef = this.overlayContainerService.open({
        content,
        origin: this.originTemplate.element.nativeElement,
        configuration: {
          panelClass: 'custom-overlay',
        },
        //   configuration: this.overlayConfiguration,
      });

      popupRef.afterClosed$.subscribe((result) => {
        console.log(result);
      });
    }

    /**
     * Demonstrates how to use the service with any component
     * Make sure to include the Component (in this case DemoOverlayComponent) as entryComponent in your module
     */
    public openComponent(): void {
      const popupRef = this.overlayContainerService.open<
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

      popupRef.afterClosed$.subscribe((result) => {
        if (result.data) {
          // this.returnedValue = result.data.returnValue;
        }
      });
    }

    /**
     * Demonstrates how to use the service with a plain text
     */
    public openText(): void {
      const popupRef = this.overlayContainerService.open({
        content:
          'Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀Hello World 🌍🚀',
        origin: this.originText.element.nativeElement,
        //   configuration: this.overlayConfiguration,
      });

      popupRef.afterClosed$.subscribe((result) => {
        console.log(result);
      });
    }
}
