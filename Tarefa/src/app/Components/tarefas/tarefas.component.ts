import { Component, OnDestroy, OnInit } from '@angular/core';
import { PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { DynamicTableComponent } from '../../Shared/dynamic-table/dynamic-table.component';
import { TarefasService } from '../../Services/tarefas.service';
import { Subscription } from 'rxjs';
import { PoPageModule, PoToolbarModule } from '@po-ui/ng-components';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [PoPageDynamicTableModule, DynamicTableComponent, PoPageModule, PoToolbarModule],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent implements OnInit, OnDestroy {
  
  public DynamicTableConfig: {
    actionsRight: boolean,
    pageCustomActions: PoPageDynamicTableCustomAction[],
    tableCustomActions: PoPageDynamicTableCustomTableAction[],
    fieldscolunasbrowse: any[],
    quickSearchWidth: number,
    height: number,
    serviceApi: any
  } = {
    actionsRight: true,
    pageCustomActions: [],
    tableCustomActions: [],
    fieldscolunasbrowse: [],
    quickSearchWidth: 3,
    height: 300,
    serviceApi: null
  };

  tarefasSubscription?: Subscription;

  ngOnInit(): void {}


  ngOnDestroy(): void {
    if(this.tarefasSubscription) {
      this.tarefasSubscription.unsubscribe();
    }
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
