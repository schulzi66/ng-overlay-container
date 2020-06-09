### Import
Import the ```NgOverlayContainerModule``` in your ```app.module```:

```typescript
import { NgOverlayContainerModule } from 'ng-overlay-container';

@NgModule({
    declarations: [...],
    imports: [NgOverlayContainerModule], // <-- Module import    
    bootstrap: [...]
})
```
<br>

### Usage
The overlay can be attached to any HTMLElement via #origin


In your HTML:
````html
<button mat-button
        #origin
        (click)="showTemplate(template)">Click me</button>

<ng-template #template
             let-close="close">
    <h2>This is a Template</h2>
    <div>This is an example with utilizing ng-template.</div>
    <button mat-button
            (click)="close({id: 2})">
        Close</button>
</ng-template>
````
<br>

Import the service in your component.ts:
```typescript
import { NgOverlayContainerService } from 'ng-overlay-container';
 
@Component({...})
export class YourComponent {
    @ViewChild('origin', { static: false, read: ViewContainerRef }) origin: ViewContainerRef;    
    
    constructor(private overlayContainerService: NgOverlayContainerService) { }

    /**
     * Demonstrates how to use the service with a plain text
     */
    public showText(): void {

        /**
         * Opens the ngPopupRef 
         */
        const ngPopupRef = this.overlayContainerService.open({
            content: 'Hello World 🌍🚀',
            origin: this.origin.element.nativeElement            
        });

        /**
         * The ngPopupRef can be used to get data back from the component
         */
        ngPopupRef.afterClosed$.subscribe(result => {
            console.log(result);
        });
    }
 
    /**
     * Demonstrates how to use the service with a TemplateRef
     * @param content Reference to the ng-template
     */
    public showTemplate(content: TemplateRef<any>): void {
        
        const ngPopupRef = this.overlayContainerService.open({
            content,
            origin: this.origin.element.nativeElement            
        });
        
        ngPopupRef.afterClosed$.subscribe(result => {
            ...
        });
    }

    /**
     * Demonstrates how to use the service with any component
     * Make sure to include the Component (in this case DemoOverlayComponent) as entryComponent in your module
     */
    public showComponent(): void {
        
        /**
         * You can define what the input and output data types for the this.overlayContainerService.open<T, R>() are
         * @param T The data passed into the container to be available in the embedded e.g. component
         * @param R The response data type returned from the afterClosed$ observable when calling close(data?: R)
         */
        const ngPopupRef = this.overlayContainerService.open<{ demoInput: number[] }, { returnValue: string }>({
            content: DemoOverlayComponent,
            origin: this.origin.element.nativeElement,
            data: {
                demoInput: [1, 2, 3, 4]
            },
            /* It is also possible to pass a custom NgOverlayContainerConfiguration to override the styles and behavior */
            configuration: this.overlayConfiguration 
        });

        /**
         * Retrieve stongly typed return values
         */
        ngPopupRef.afterClosed$.subscribe(result => {
            if (result.data) {
                this.returnedValue = result.data.returnValue;
            }
        });
    }
}
```

<br>

### Open method definition

```typescript
/**
 * Opens an popover relative to the {@param origin} with the provided {@param content}.
 * @param T The data passed into the container to be available in the embedded e.g. component
 * @param R The response data type returned from the afterClosed$ observable when calling close(data?: R)
 * @param origin The origin to which the popover is attached
 * @param content The dynamic content to be rendered: 'template' | 'component' | 'text'
 * @param data Any data that is needed in the rendered e.g. component accessible from the component constructor via the NgPopoverRef (DI)
 * @param configuration Any custom overlay configuration
 * @returns The reference to the NgPopoverRef
 */
public open<T = any, R = any>({ origin, content, data, configuration }: NgOverlayContainerParameters<T>): NgPopoverRef<T, R>
```
<br>

### NgOverlayContainerParameters

````typescript
/**
 * Parameter structure to open an overlay container
 */
export interface NgOverlayContainerParameters<T> {
    origin: HTMLElement;
    content: NgOverlayContainerContent;
    data?: T;
    configuration?: NgOverlayContainerConfiguration;
}
````
<br>

### NgOverlayContainerContent

````typescript
/**
 * Supported types of embedded content
 */
export type NgOverlayContainerContent = TemplateRef<any> | Type<any> | string;
````
<br>

### NgOverlayContainerConfiguration

````typescript
/**
 * Configuration for the overlay container
 */
export interface NgOverlayContainerConfiguration {
    width?: string;
    height?: string;
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    originX?: HorizontalConnectionPos;
    originY?: VerticalConnectionPos;
    overlayX?: HorizontalConnectionPos;
    overlayY?: VerticalConnectionPos;
    offsetX?: number;
    offsetY?: number;
}
````
<br>

### Default NgOverlayContainerConfiguration
By default the following container configuration is applied if no custom configuration is provided. Any provided panelClass will extend the ng-overlay-container.

````typescript

/**
 * Default overlay container configuration
 */
export const DEFAULT_OVERLAY_CONFIGURATION: NgOverlayContainerConfiguration = {
    hasBackdrop: true,
    backdropClass: 'cdk-overlay-transparent-backdrop',
    panelClass: 'ng-overlay-container',
    width: '400px',
    height: '500px',
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetX: 0,
    offsetY: 10
}
````