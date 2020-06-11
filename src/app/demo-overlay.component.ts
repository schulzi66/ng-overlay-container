import { Component } from '@angular/core';
import { NgPopoverRef } from 'ng-overlay-container';
@Component({
  selector: 'demo-overlay',
  template: `
    <div style="display: flex; flex-direction: column; height: 100%;">
      <div style="flex: 1;">
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
      <form style="margin: 10px;">
        <mat-form-field style="width: 100%;">
          <mat-label>Example data to pass back to host</mat-label>
          <input name="valueTextField" matInput value="" [(ngModel)]="valueTextField" />
        </mat-form-field>
      </form>

      <button style="margin: 10px;" mat-stroked-button color="primary" (click)="close()">
        Pass data back
      </button>
    </div>
  `
})
export class DemoOverlayComponent {
  public demoInput: number[];
  public valueTextField = '';

  constructor(
    private popoverRef: NgPopoverRef<{
      demoInput: number[];
      returnValue: string;
    }>
  ) {
    this.demoInput = this.popoverRef.data.demoInput;
  }

  public close() {
    this.popoverRef.close({ returnValue: this.valueTextField });
  }
}
