import { Injectable } from '@angular/core';
import { PoPageDynamicTableCustomAction } from '@po-ui/ng-templates';
import { NOpcEnum } from '../Interface/enum';
import { PoModalComponent } from '@po-ui/ng-components';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TarefasService {
  constructor(private _http: HttpClient) {}

  public currentNOpc: NOpcEnum = NOpcEnum.Visualizar;
  public isDataLoaded: boolean = false;
  public resetForm: boolean = false;
  public formData: any = {};

  // Ação do botão "Incluir"
  pagaCustomAction(
    onIncluirCallback: () => void
  ): Array<PoPageDynamicTableCustomAction> {
    return [
      {
        label: 'Incluir',
        action: onIncluirCallback,
        icon: 'po-icon-plus',
      },
    ];
  }

  // Campos da tabela
  fieldscolunasbrowse(): Array<any> {
    return [
      {
        property: 'status',
        label: 'Status',
        filter: true,
        gridColumns: 12,
        type: 'subtitle',
        options: this.statusOptions,
        subtitles: [
          { value: 0, color: 'warning', label: 'Pendente' },
          { value: 1, color: 'success', label: 'Concluído' },
        ],
      },
      {
        property: 'id',
        label: 'ID Tarefa',
        filter: true,
        gridColumns: 12,
      },
      {
        property: 'descricao',
        label: 'Descrição',
        gridColumns: 12,
        rows: 5,
        placeholder: 'Digite sua descrição',
      },
    ];
  }

  // Campos do formulário dinâmico
  fieldsdynamic(): Array<any> {
    return [
      {
        property: 'status',
        label: 'Status',
        gridColumns: 12,
        options: this.statusOptions,
      },
      {
        property: 'descricao',
        label: 'Descrição',
        gridColumns: 12,
        rows: 5,
        placeholder: 'Digite sua descrição',
      },
    ];
  }

  readonly statusOptions: Array<object> = [
    { value: 0, label: 'Pendente', color: 'danger' },
    { value: 1, label: 'Concluído', color: 'success' },
  ];

  incluirTarefa(tarefaData: any): Observable<any> {
    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) {
      console.error('Usuário não autenticado. Token não encontrado.');
      return of(null);
    }

    const currentUser = JSON.parse(currentUserString);
    const token = currentUser.token;

    if (!token) {
      console.error('Token não encontrado no objeto do usuário.');
      return of(null);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const payload = tarefaData;

    return this._http.post<any>(
      `${environment.apiUrl}/tarefas`,
      payload,
      httpOptions
    );
  }

  deletarTarefa(id: string): Observable<any> {
    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) {
      console.error('Usuário não autenticado. Token não encontrado.');
      return of(null); // Retorna um observable nulo
    }

    const currentUser = JSON.parse(currentUserString);
    const token = currentUser.token;

    if (!token) {
      console.error('Token não encontrado no objeto do usuário.');
      return of(null);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this._http.delete(
      `${environment.apiUrl}/tarefas/${id}`,
      httpOptions
    );
  }
}
