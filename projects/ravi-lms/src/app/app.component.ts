import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from './Courses/footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule,FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'RaviLms';
}
