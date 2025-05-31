import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from './Courses/footer/footer.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule,FooterComponent,CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'RaviLms';

  constructor(public router: Router) {}
}
