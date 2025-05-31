import { Component, ViewChild } from '@angular/core';
import { IdynamicTable } from '../../Interface/idynamic-table';
import { TarefasService } from '../../Services/tarefas.service';
import { Subscription } from 'rxjs';
import { DynamicTableComponent } from '../../Shared/dynamic-table/dynamic-table.component';
import { PoModalComponent, PoModalModule } from '@po-ui/ng-components';
import { UsuarioService } from '../../Services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [DynamicTableComponent, PoModalModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  public DynamicTableConfig: IdynamicTable = {
    title: '',
    actionsRight: true,
    pageCustomActions: [],
    tableCustomActions: [],
    fieldscolunasbrowse: [],
    quickSearchWidth: 3,
    height: 300,
    serviceApi: null,
  };

  tarefasSubscription?: Subscription;

  ngOnInit(): void {
    this.GetConfigDynamicTable();
  }

  constructor(private _usuarioService: UsuarioService) {}

  GetConfigDynamicTable() {
    this.DynamicTableConfig.title               = 'Usuários';
    this.DynamicTableConfig.actionsRight        = true;
    this.DynamicTableConfig.quickSearchWidth    = 3;
    this.DynamicTableConfig.height              = 300;
    this.DynamicTableConfig.fieldscolunasbrowse = this._usuarioService.fieldscolunasbrowse();
    this.DynamicTableConfig.serviceApi          = this._usuarioService;
    this.DynamicTableConfig.tableCustomActions  = this._usuarioService.tableCustomActions();
    this.DynamicTableConfig.pageCustomActions   = this._usuarioService.pagaCustomAction(() => {
      this.onIncluir();
    });
  }

  onIncluir() {
    this._usuarioService.onIncluir(this.poModal);
  }
}
