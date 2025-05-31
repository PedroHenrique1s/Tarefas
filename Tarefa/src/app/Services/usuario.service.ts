import { Injectable } from '@angular/core';
import { NOpcEnum } from '../Interface/enum';
import { PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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
      { property: 'idUsuario', label: 'ID Usuario', width: '100px', filter: true, gridColumns: 4 },
      { property: 'email', label: 'Email', width: '150px' ,filter: true, gridColumns: 4 },
      { property: 'senha', label: 'Senha', width: '150px', filter: true, gridColumns: 12 }
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

  private onIncluir(): void {
    this.currentNOpc = NOpcEnum.Incluir;
    this.isDataLoaded = true;
    this.resetForm = true;
  }
}
