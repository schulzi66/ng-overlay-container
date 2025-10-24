import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
    selector: 'app-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.scss'],
    imports: [MarkdownComponent]
})
export class DocumentationComponent {
}
