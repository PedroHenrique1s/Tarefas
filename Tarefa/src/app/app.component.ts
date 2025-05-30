import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PoPageModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
