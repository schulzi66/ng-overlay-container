import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgOverlayContainerModule } from 'ng-overlay-container';
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './app.component';
import { DemoOverlayComponent } from './demo-overlay.component';
import { DemoComponent } from './demo/demo.component';
import { DocumentationComponent } from './documentation/documentation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full'
  },
  { path: 'demo', component: DemoComponent },
  { path: 'docs', component: DocumentationComponent }
];

@NgModule({
  declarations: [AppComponent, DemoOverlayComponent, DocumentationComponent, DemoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    MarkdownModule.forRoot({
      loader: HttpClient
    }),
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,    
    NgOverlayContainerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
