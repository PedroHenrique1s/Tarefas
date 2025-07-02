import { Injectable } from '@angular/core';
import { PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
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

  pagaCustomAction(
    onIncluirCallback: () => void
  ): Array<PoPageDynamicTableCustomAction> {
    return [
      {
        label: 'Incluir',
        action: onIncluirCallback,
        icon: 'an an-eye-closed',
      },
    ];
  }

  fieldscolunasbrowse(): Array<any> {
    return [
      {
        property: 'status',
        label: 'Status',
        width: '150px',
        options: this.statusOptions,
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

  fieldsdynamic(): Array<any> {
    return [
      {
        property: 'status',
        label: 'Status',
        width: '150px',
        options: this.statusOptions,
        filter: true,
        gridColumns: 12,
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

  tableCustomActions(): Array<PoPageDynamicTableCustomTableAction> {
    return [
      {
        label: 'Visualizar',
        action: (row: any) => {
          this.currentNOpc = NOpcEnum.Visualizar;
          this.isDataLoaded = true;
          this.resetForm = false;
        },
        icon: 'an an-eye-closed',
      },
      {
        label: 'Alterar',
        action: (row: any) => {
          this.currentNOpc = NOpcEnum.Alterar;
          this.isDataLoaded = true;
          this.resetForm = false;
        },
        icon: 'an an-edit',
      },
      {
        label: 'Deletar',
        action: (row: any) => {
          this.currentNOpc = NOpcEnum.Deletar;
          this.isDataLoaded = true;
          this.resetForm = false;
        },
        icon: 'an an-trash',
      },
    ];
  }

  readonly statusOptions: Array<object> = [
    { value: 0, label: 'Pendente' },
    { value: 1, label: 'Concluído' },
  ];

  public onIncluir(poModal: PoModalComponent): void {
    this.currentNOpc = NOpcEnum.Incluir;
    this.isDataLoaded = true;
    this.resetForm = true;
    poModal.open();
  }
}
