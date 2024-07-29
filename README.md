<h1 align="center" style="border-bottom: none;">NgOverlayContainer 🏗️</h1>
<h3 align="center">Making the creation of overlays a piece of 🍰</h3>

<p align="center" style="margin: 1.5rem">
    <a href="https://img.shields.io/npm/v/ng-overlay-container"><img alt="NPM Version" src="https://img.shields.io/npm/v/ng-overlay-container"></a>
    <a href="https://img.shields.io/npm/dw/ng-overlay-container"><img alt="Downloads per Week" src="https://img.shields.io/npm/dw/ng-overlay-container"></a>
    <a href="https://img.shields.io/website?url=https%3A%2F%2Fng-overlay-container.netlify.app%2F%23%2Fdemo"><img alt="Downloads per Week" src="https://img.shields.io/website?url=https%3A%2F%2Fng-overlay-container.netlify.app%2F%23%2Fdemo"></a>
</p>

**ng-overlay-container** makes creating floating overlays for an angular application a breeze. It abstracts the angular cdk and provides a highly customizable interface for you to plug-n-use.

## Table of content
- [Table of content](#table-of-content)
- [Supported Versions](#supported-versions)
- [Breaking Changes](#breaking-changes)
- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Global](#global)
  - [Flexible](#flexible)
- [API](#api)
  - [Open Method Definition](#open-method-definition)
  - [NgOverlayContainerParameters](#ngoverlaycontainerparameters)
  - [NgOverlayContainerContent](#ngoverlaycontainercontent)
  - [NgOverlayContainerConfiguration](#ngoverlaycontainerconfiguration)
    - [Default NgOverlayContainerConfiguration](#default-ngoverlaycontainerconfiguration)
    - [Order Of Fallback Positions](#order-of-fallback-positions)
- [Contribute](#contribute)


## Supported Versions

    The major versions reflect the used Angular version
    18.x.x => Angular 18
    17.x.x => Angular 17
    16.x.x => Angular 16
    15.x.x => Angular 15
    14.x.x => Angular 14
    13.x.x => Angular 13
    12.x.x => Angular 12
    11.x.x => Angular 11
    10.x.x => Angular 10
    0.0.x => Angular 9

## Breaking Changes
- From `v16.0.2` on there will be no default width and heigth. The size adapts dynamically to the content.

## Getting Started

Install with:
```
$ npm i ng-overlay-container
```

Validate the PeerDependencies:

```json
"peerDependencies": {
    "@angular/cdk": "^18.0.0",
    "@angular/common": "^18.0.0",
    "@angular/core": "^18.0.0",
    "@angular/material": "^18.0.0"
}
```

Add a material theme e.g. a prebuild one (if not done already):

```json
"styles": [
   "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
]
```

If you are not using Angular Material but the Angular CDK on its own, you have to include a small set of structural styles in your global stylessheet to use the overlay correctly:

```css
@import '@angular/cdk/overlay-prebuilt.css';
```

Import the `NgOverlayContainerModule` in your `app.module`:

```typescript
import { NgOverlayContainerModule } from 'ng-overlay-container';

@NgModule({
    declarations: [...],
    imports: [NgOverlayContainerModule], // <-- Module import
    bootstrap: [...]
})
```

## Usage

### Global

The overlay can be displayed in the viewport unrelated to any origin element by using `NgOverlayContainerConfiguration.useGlobalPositionStrategy = true`.

<br>

### Flexible

The overlay can also be attached to any HTMLElement via #origin

In your HTML:

```html
<button mat-button #origin (click)="showTemplate(template)">Click me</button>

<ng-template #template let-data="data" let-close="close">
  <h2>This is a Template</h2>
  <div>This is an example with utilizing ng-template.</div>
  <div>This is data passed to the template: {{data}}</div>
  <button mat-button (click)="close({id: 2})">Close</button>
</ng-template>
```

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

## API
### Open Method Definition

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

```typescript
/**
 * Parameter structure to open an overlay container
 */
export interface NgOverlayContainerParameters<T> {
  origin: HTMLElement;
  content: NgOverlayContainerContent;
  data?: T;
  configuration?: NgOverlayContainerConfiguration;
}
```

<br>

### NgOverlayContainerContent

```typescript
/**
 * Supported types of embedded content
 */
export type NgOverlayContainerContent = TemplateRef<any> | Type<any> | string;
```

<br>

### NgOverlayContainerConfiguration

```typescript
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
  fallbackPositions?: ConnectionPositionPair[]
}
```

<br>

#### Default NgOverlayContainerConfiguration

By default the following container configuration is applied if no custom configuration is provided. Any provided panelClass will extend the ng-overlay-container.

```typescript
/**
 * Default overlay container configuration
 */
export const DEFAULT_OVERLAY_CONFIGURATION: NgOverlayContainerConfiguration = {
  hasBackdrop: true,
  backdropClass: "cdk-overlay-transparent-backdrop",
  panelClass: "ng-overlay-container",
  useGlobalPositionStrategy: false,
  originX: "center",
  originY: "bottom",
  overlayX: "center",
  overlayY: "top",
  offsetX: 0,
  offsetY: 10,
  isDraggable: false,
  isResizable: true,
  disableBackdropClose: false,
  fallbackPositions: []
};
```

<br>

#### Order Of Fallback Positions

The order of fallback positions, if the overlay can't be displayed onscreen.

Custom fallback positions will have priority over the default positions.

```typescript
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
```



## Contribute
First of, thank you for considering to contribute! 🎉👍

Contributions, enhancements, and bug-fixes are welcome! [Open an issue](https://github.com/schulzi66/ng-overlay-container/issues) on GitHub and [submit a pull request](https://github.com/schulzi66/ng-overlay-container/pulls).

To do so, follow these steps:
1. Fork the repository as described on the [official Github Docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
2. Open the <code>ng-overlay-container.code-workspace</code>
2. Run <code>npm install</code>
3. Run <code>npm run start</code> to run the demo application
4. Make your changes/fix
    - Write unit tests for any code change
    - Update the README.md accordingly
    - Increase the version number in `projects/ng-overlay-container/package.json`
5. Run <code>npm run test</code> to execute all unit tests locally
6. Submit a pull request to bring your changes to this repository
    - Provide a description for your changes
