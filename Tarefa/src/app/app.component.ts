import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly menus: Array<PoMenuItem> = [
    { label: 'Cadastro de Tarefas', action: this.Cadastro.bind(this) },
    { label: 'Cadastro de Usuário', action: this.Usuario.bind(this) },
  ];

  private Cadastro() {
    alert('Clicked in menu item');
  }

  private Usuario() {
    alert('Clicked in menu item');
  }
}
