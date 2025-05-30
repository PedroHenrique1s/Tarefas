import { Injectable } from '@angular/core';
import { PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { NOpcEnum } from '../Interface/enum';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor() { }

  public currentNOpc: NOpcEnum = NOpcEnum.Visualizar;
  public isDataLoaded: boolean = false;
  public resetForm: boolean = false;

  pagaCustomAction(): Array<PoPageDynamicTableCustomAction> {
    return [
      {
        label: 'Incluir',
        action: this.onIncluir.bind(this),
        icon: 'an an-eye-closed'
      }
    ];
  }

  fieldscolunasbrowse(): Array<any> {
    return [
      { property: 'idTarefa', label: 'ID Tarefa', width: '100px', filter: true, gridColumns: 4 },
      { property: 'status', label: 'Status', width: '150px', options: this.statusOptions ,filter: true, gridColumns: 4 },
      { property: 'descricao', label: 'Descrição', width: '300px', filter: true, gridColumns: 12 }
    ];
  }

  tableCustomActions(): Array<PoPageDynamicTableCustomTableAction>{
    return [
      {
        label: 'Visualizar',
        action: (row: any) => {
          this.currentNOpc = NOpcEnum.Visualizar;
          this.isDataLoaded = true;
          this.resetForm = false;
        },
        icon: 'an an-eye-closed'
      },
      {
        label: 'Alterar',
        action: (row: any) => {
          this.currentNOpc = NOpcEnum.Alterar;
          this.isDataLoaded = true;
          this.resetForm = false;
        },
        icon: 'an an-edit'
      },
      {
        label: 'Deletar',
        action: (row: any) => {
          this.currentNOpc = NOpcEnum.Deletar;
          this.isDataLoaded = true;
          this.resetForm = false;
        },
        icon: 'an an-trash'
      }
    ];
  }

  readonly statusOptions: Array<object> = [
    { value: 0, label: 'Pendente' },
    { value: 1, label: 'Concluído' }
  ];

  private onIncluir(): void {
    this.currentNOpc = NOpcEnum.Incluir;
    this.isDataLoaded = true;
    this.resetForm = true;
  }
}
