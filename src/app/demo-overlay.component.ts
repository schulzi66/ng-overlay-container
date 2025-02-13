import { Component } from '@angular/core';
import { NgPopoverRef } from 'ng-overlay-container';
@Component({
    selector: 'demo-overlay',
    template: `
    <button style="float: right;" mat-icon-button color="primary" (click)="maximize()">
      <mat-icon>{{ resizeIcon }}</mat-icon>
    </button>
    <div style="display: flex; flex-direction: column; height: 100%;">
      <div style="flex: 1;">
        <h2>This is a demo component</h2>
        <div>You can pass any component to be displayed into the overlay container.</div>
        <div style="margin-bottom: 10px;">
          You can also pass data to the component like this number[]: {{ demoInput }}
        </div>
      </div>
      <form style="margin: 10px;">
        <mat-form-field style="width: 100%;">
          <mat-label>Example data to pass back to host</mat-label>
          <input name="valueTextField" matInput value="" [(ngModel)]="valueTextField" />
        </mat-form-field>
      </form>

      <button style="margin: 10px;" mat-stroked-button color="primary" (click)="close()">Pass data back</button>
    </div>
  `,
    standalone: false
})
export class DemoOverlayComponent {
  private isExpanded: boolean;

  public demoInput: number[];
  public valueTextField = '';

  constructor(
    private popoverRef: NgPopoverRef<{
      demoInput: number[];
      returnValue: string;
    }>
  ) {
    this.isExpanded = false;
    this.demoInput = this.popoverRef.data.demoInput;
  }

  public get resizeIcon(): string {
    return this.isExpanded ? 'fullscreen_exit' : 'fullscreen';
  }

  public close() {
    this.popoverRef.close({ returnValue: this.valueTextField });
  }

  public maximize() {
    this.popoverRef.toggleMaximize();
    this.isExpanded = !this.isExpanded;
  }
}
