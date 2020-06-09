import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { NgOverlayContainerModule } from 'src/lib/overlay-container/public-api';
import { AppComponent } from './app.component';
import { DemoOverlayComponent } from './demo-overlay.component';
import { DemoComponent } from './demo/demo.component';
import { DocumentationComponent } from './documentation/documentation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full',
  },
  { path: 'demo', component: DemoComponent },
  { path: 'docs', component: DocumentationComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DemoOverlayComponent,
    DocumentationComponent,
    DemoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true }),
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    NgOverlayContainerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
