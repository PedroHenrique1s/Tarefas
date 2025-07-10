import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicTableComponent } from '../../Shared/dynamic-table/dynamic-table.component';
import { TarefasService } from '../../Services/tarefas.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { IdynamicTable } from '../../Interface/idynamic-table';
import {
  PoModalComponent,
  PoModalModule,
  PoDynamicModule,
  PoDynamicFormField,
  PoButtonModule,
  PoDynamicFormComponent,
} from '@po-ui/ng-components';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [
    DynamicTableComponent,
    PoModalModule,
    PoDynamicModule,
    PoButtonModule,
  ],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css',
})
export class TarefasComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @ViewChild(PoDynamicFormComponent, { static: true })
  poComponet!: PoDynamicFormComponent;

  public fields: Array<PoDynamicFormField> = [];
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

  constructor(protected _tarefasService: TarefasService) {}

  GetConfigDynamicTable() {
    this.DynamicTableConfig.title = 'Tarefas';
    this.DynamicTableConfig.actionsRight = true;
    this.DynamicTableConfig.quickSearchWidth = 3;
    this.DynamicTableConfig.height = 300;
    this.DynamicTableConfig.fieldscolunasbrowse =
      this._tarefasService.fieldscolunasbrowse();
    this.DynamicTableConfig.serviceApi = `${environment.apiUrl}/tarefas`;

    // 👇 Aqui você usa ações locais, chamando os métodos deste componente
    this.DynamicTableConfig.tableCustomActions = [
      {
        label: 'Visualizar',
        action: (row: any) => this.onVisualizar(row),
        icon: 'po-icon-eye',
      },
      {
        label: 'Alterar',
        action: (row: any) => this.onAlterar(row),
        icon: 'po-icon-edit',
      },
      {
        label: 'Deletar',
        action: (row: any) => this.onDeletar(row),
        icon: 'po-icon-delete',
      },
    ];

    this.DynamicTableConfig.pageCustomActions =
      this._tarefasService.pagaCustomAction(() => {
        this.onIncluir();
      });
  }

  onIncluir(): void {
    this.fields = this._tarefasService.fieldsdynamic();
    this._tarefasService.currentNOpc = 3; // Incluir
    this._tarefasService.formData = {}; // Limpa o formulário
    this.poModal.open();
  }

  closeModal() {
    this.poComponet.form.reset();
    this.poModal.close();
  }

  confirmTask() {}

  restore() {
    this.poComponet.form.reset();
  }

  onVisualizar(tarefa: any): void {
    this.fields = this._tarefasService.fieldsdynamic();
    this._tarefasService.currentNOpc = 2; // Visualizar
    this._tarefasService.formData = { ...tarefa };
    this.poModal.open();
  }

  onAlterar(tarefa: any): void {
    this.fields = this._tarefasService.fieldsdynamic();
    this._tarefasService.currentNOpc = 4; // Alterar
    this._tarefasService.formData = { ...tarefa };
    this.poModal.open();
  }

  onDeletar(tarefa: any): void {
    this.fields = this._tarefasService.fieldsdynamic();
    this._tarefasService.currentNOpc = 5; // Deletar
    this._tarefasService.formData = { ...tarefa };
    this.poModal.open();
  }
}
