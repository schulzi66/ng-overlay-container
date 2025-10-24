import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { provideNgOverlayContainer } from 'ng-overlay-container';
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './app/app.component';
import { DemoComponent } from './app/demo/demo.component';
import { DocumentationComponent } from './app/documentation/documentation.component';
import { environment } from './environments/environment';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full'
  },
  { path: 'demo', component: DemoComponent },
  { path: 'docs', component: DocumentationComponent }
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, CommonModule, FormsModule, MarkdownModule.forRoot({
            loader: HttpClient
        }), MatIconModule, MatInputModule, MatSidenavModule, MatRadioModule, MatButtonModule, MatSelectModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideRouter(routes, withHashLocation()),
        provideNgOverlayContainer()
    ]
})
  .catch(err => console.error(err));
