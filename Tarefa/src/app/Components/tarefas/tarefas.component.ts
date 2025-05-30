import { Component, OnInit } from '@angular/core';
import { DynamicTableComponent } from '../../Shared/dynamic-table/dynamic-table.component';
import { TarefasService } from '../../Services/tarefas.service';
import { Subscription } from 'rxjs';
import { IdynamicTable } from '../../Interface/idynamic-table';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent implements OnInit {

  public DynamicTableConfig: IdynamicTable =  {
    actionsRight: true,
    pageCustomActions: [],
    tableCustomActions: [],
    fieldscolunasbrowse: [],
    quickSearchWidth: 3,
    height: 300,
    serviceApi: null
  };

  tarefasSubscription?: Subscription;

  ngOnInit(): void {
    this.GetConfigDynamicTable();
  }

  constructor( private _tarefasService:TarefasService){}

  GetConfigDynamicTable() {
    this.DynamicTableConfig.actionsRight = true;
    this.DynamicTableConfig.quickSearchWidth = 3;
    this.DynamicTableConfig.height = 300;
    this.DynamicTableConfig.pageCustomActions =  this._tarefasService.pagaCustomAction();
    this.DynamicTableConfig.fieldscolunasbrowse = this._tarefasService.fieldscolunasbrowse();
    this.DynamicTableConfig.serviceApi = this._tarefasService;
    this.DynamicTableConfig.tableCustomActions = this._tarefasService.tableCustomActions();
  }

}
