import { Component } from '@angular/core';
import { PopoverRef } from 'src/lib/overlay-container/public-api';

@Component({
  selector: 'demo-overlay',
  template: `
    <div style="display: flex; flex-direction: column; height: 100%;">
      <div style="flex: 1; padding: 10px 10px 0 10px;">
        <h2>This is a demo component</h2>
        <div>
          You can pass any component to be displayed into the overlay container.
        </div>
        <div style="margin-bottom: 20px;">
          You can also pass data to the componet like this number[]:
        </div>
        <div *ngFor="let number of demoInput">
          {{ number }}
        </div>
      </div>
      <button
        style="margin: 10px;"
        mat-stroked-button
        color="primary"
        (click)="close()"
      >
        Pass data back
      </button>
    </div>
  `,
})
export class DemoOverlayComponent {
  public demoInput: number[];
  public valueTextField = '';

  constructor(
    private popoverRef: PopoverRef<{ demoInput: number[]; returnValue: string }>
  ) {
    this.demoInput = this.popoverRef.data.demoInput;
  }

  public close() {
    this.popoverRef.close({ returnValue: this.valueTextField });
  }
}
