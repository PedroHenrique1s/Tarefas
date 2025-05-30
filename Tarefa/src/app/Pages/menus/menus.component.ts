import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PoMenuItem, PoMenuModule, PoPageModule, PoToolbarModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [
    CommonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    HttpClientModule,
    RouterOutlet
  ],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css'
})
export class MenusComponent {
  constructor(private router: Router) {}
  
  readonly menus: Array<PoMenuItem> = [
    { label: 'Cadastro de Tarefas', action: () => this.router.navigate(['/tarefas']) },
    { label: 'Cadastro de Usuário', action: () => this.router.navigate(['/usuario']) },
    { label: 'Sair', action: () => this.router.navigate(['/login']) },
  ];

}
