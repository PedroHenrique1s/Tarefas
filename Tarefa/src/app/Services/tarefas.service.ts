import { Injectable } from '@angular/core';
import { PoPageDynamicTableCustomAction } from '@po-ui/ng-templates';
import { NOpcEnum } from '../Interface/enum';
import { PoModalComponent } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class TarefasService {
  constructor() {}

  public currentNOpc: NOpcEnum = NOpcEnum.Visualizar;
  public isDataLoaded: boolean = false;
  public resetForm: boolean = false;
  public formData: any = {};

  // Ação do botão "Incluir"
  pagaCustomAction(onIncluirCallback: () => void): Array<PoPageDynamicTableCustomAction> {
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
        width: '150px',
        filter: true,
        gridColumns: 6,
      },
      {
        property: 'id',
        label: 'ID Tarefa',
        width: '100px',
        filter: true,
        gridColumns: 6,
      },
      {
        property: 'descricao',
        label: 'Descrição',
        width: '300px',
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
        width: '150px',
        filter: true,
        gridColumns: 12,
        options: this.statusOptions,
      },
      {
        property: 'descricao',
        label: 'Descrição',
        width: '300px',
        filter: true,
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

}
