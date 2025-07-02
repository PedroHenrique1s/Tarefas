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

  constructor(private _tarefasService: TarefasService) {}

  GetConfigDynamicTable() {
    this.DynamicTableConfig.title = 'Tarefas';
    this.DynamicTableConfig.actionsRight = true;
    this.DynamicTableConfig.quickSearchWidth = 3;
    this.DynamicTableConfig.height = 300;
    this.DynamicTableConfig.fieldscolunasbrowse =
      this._tarefasService.fieldscolunasbrowse();
    this.DynamicTableConfig.serviceApi = `${environment.apiUrl}/tarefas`;;
    this.DynamicTableConfig.tableCustomActions =
      this._tarefasService.tableCustomActions();
    this.DynamicTableConfig.pageCustomActions =
      this._tarefasService.pagaCustomAction(() => {
        this.onIncluir();
      });
  }

  onIncluir() {
    this.fields = this._tarefasService.fieldsdynamic();
    this._tarefasService.onIncluir(this.poModal);
  }

  closeModal() {
    this.poComponet.form.reset();
    this.poModal.close();
  }

  confirmTask() {}

  restore() {
    this.poComponet.form.reset();
  }
}
