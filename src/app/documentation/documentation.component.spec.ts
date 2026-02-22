/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, importProvidersFrom } from '@angular/core';

import { DocumentationComponent } from './documentation.component';
import { HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideNgOverlayContainer } from 'ng-overlay-container';

describe('DocumentationComponent', () => {
  let component: DocumentationComponent;
  let fixture: ComponentFixture<DocumentationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocumentationComponent],
      providers: [
        provideNgOverlayContainer(),
        provideRouter([], withHashLocation()),
        importProvidersFrom(MarkdownModule.forRoot({
          loader: HttpClient
        }))
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
