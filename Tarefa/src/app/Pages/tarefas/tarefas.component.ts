import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoPageModule, PoToolbarModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [PoToolbarModule, PoPageModule],
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent {
  nome = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.nome = params['nome'];
      console.log('Nome recebido:', this.nome);
    });
  }
}