import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
    selector: 'app-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MarkdownComponent]
})
export class DocumentationComponent {
}
