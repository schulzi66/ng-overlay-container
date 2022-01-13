![npm](https://img.shields.io/npm/v/ng-overlay-container)
![npm](https://img.shields.io/npm/dw/ng-overlay-container)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fng-overlay-container.netlify.app%2F%23%2Fdemo)

# NgOverlayContainer

```
Making the creation of overlays a piece of 🍰
```
### Versions

    The major versions reflect the used Angular version
    12.x.x => Angular 12
    11.x.x => Angular 11
    10.x.x => Angular 10
    0.0.x => Angular 9


### Import
Install the PeerDependencies:
```json
"peerDependencies": {
    "@angular/cdk": "12.2.13",
    "@angular/common": "12.2.15",
    "@angular/core": "12.2.15",
    "@angular/material": "12.2.13"
}
```

Add a material theme e.g. a prebuild one (if not done already):
 ```json
"styles": [        
    "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",    
]
 ```

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
#### Global
The overlay can be displayed in the viewport unrelated to any origin element by using `NgOverlayContainerConfiguration.useGlobalPositionStrategy = true`.

#### Flexible
The overlay can also be attached to any HTMLElement via #origin


In your HTML:
````html
<button mat-button
        #origin
        (click)="showTemplate(template)">Click me</button>

<ng-template #template
             let-data="data"
             let-close="close">
    <h2>This is a Template</h2>
    <div>This is an example with utilizing ng-template.</div>
    <div>This is data passed to the template: {{data}}</div>
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
         * Opens the ngPopoverRef 
         */
        const ngPopoverRef = this.overlayContainerService.open({
            content: 'Hello World 🌍🚀',
            origin: this.origin.element.nativeElement            
        });

        /**
         * The ngPopoverRef can be used to get data back from the component
         */
        ngPopoverRef.afterClosed$.subscribe(result => {
            console.log(result);
        });
    }
 
    /**
     * Demonstrates how to use the service with a TemplateRef
     * @param content Reference to the ng-template
     */
    public showTemplate(content: TemplateRef<any>): void {
        
        const ngPopoverRef = this.overlayContainerService.open<string, { id: number }>({
            content,
            data: 'Demo Dummy',
            origin: this.origin.element.nativeElement            
        });
        
        ngPopoverRef.afterClosed$.subscribe(result => {
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
        const ngPopoverRef = this.overlayContainerService.open<{ demoInput: number[] }, { returnValue: string }>({
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
        ngPopoverRef.afterClosed$.subscribe(result => {
            if (result.data) {
                this.returnedValue = result.data.returnValue;
            }
        });

        /**
         * Resize the popover
         */
        ngPopoverRef.resize('100%', '100%');

        
        /**
         * Toggle maximize of the popover
         */
        popoverRef.toggleMaximize();
        
    }

    /**
    * Demonstrates ho to use the service to open the overlay unrelated to any origin element by using `NgOverlayContainerConfiguration.useGlobalPositionStrategy = true`
    */
    public showWithoutOrigin(): void {
        const ngPopoverRef = this.ngOverlayContainerService.open({
            content: 'Demonstration Centered',
            configuration: {useGlobalPositionStrategy: true}
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
 * @param content The dynamic content to be rendered: 'template' | 'component' | 'text'
 * @param origin The origin to which the popover is attached. Not needed if used in combination with NgOverlayContainerConfiguration.useGlobalPositionStrategy = true. If the overlay can't be displayed on the screen, fallback positions are used
 * @param data Any data that is needed in the rendered component (accessible from the component constructor via the PopoverRef (DI)) or in the template via template variable let-data
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
    minWidth?: number | string;
    minHeight?: number | string;
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    useGlobalPositionStrategy?: boolean;
    originX?: HorizontalConnectionPos;
    originY?: VerticalConnectionPos;
    overlayX?: HorizontalConnectionPos;
    overlayY?: VerticalConnectionPos;
    offsetX?: number;
    offsetY?: number;
    isDraggable?: boolean;
    isResizable?: boolean;
    disableBackdropClose?: boolean;
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
    useGlobalPositionStrategy: false,
    width: '400px',
    height: '500px',
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetX: 0,
    offsetY: 10,
    isDraggable: false,
    isResizable: true,
    disableBackdropClose: false
}
````
<br>

### Order of fallback positions

````typescript
{
  // Bottom
  originX: 'center',
  originY: 'bottom',
  overlayX: 'center',
  overlayY: 'top'
},
{
  // Right
  originX: 'end',
  originY: 'center',
  overlayX: 'start',
  overlayY: 'center'
},
{
  // Left
  originX: 'start',
  originY: 'center',
  overlayX: 'end',
  overlayY: 'center'
},
{
  // Top
  originX: 'center',
  originY: 'top',
  overlayX: 'center',
  overlayY: 'bottom'
}
````
