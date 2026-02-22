/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, importProvidersFrom } from '@angular/core';

import { DemoComponent } from './demo.component';
import { HttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideNgOverlayContainer } from 'ng-overlay-container';
import { MarkdownModule } from 'ngx-markdown';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DemoComponent],
      providers: [
        provideNgOverlayContainer(),
        provideRouter([], withHashLocation()),
        importProvidersFrom(MarkdownModule.forRoot({
          loader: HttpClient
        }))
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
