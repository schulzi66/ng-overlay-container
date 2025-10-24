import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [MatDrawerContainer, MatDrawer, RouterLinkActive, RouterLink, MatIconButton, MatIcon, RouterOutlet],
})
export class AppComponent {
  title = 'ng-overlay-container';
}
