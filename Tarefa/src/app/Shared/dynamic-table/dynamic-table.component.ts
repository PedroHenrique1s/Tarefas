import { Component, Input, ViewChild } from '@angular/core';
import { PoPageDynamicTableComponent, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { IdynamicTable } from '../../Interface/idynamic-table';
import { PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [PoPageDynamicTableModule, PoPageModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css'
})
export class DynamicTableComponent {
  @Input() dynamicTableConfig: IdynamicTable = {
    actionsRight: true,
    pageCustomActions: [],
    tableCustomActions: [],
    fieldscolunasbrowse: [],
    quickSearchWidth: 3,
    height: 300,
    serviceApi: null
  }
  public actionsRight:        boolean = true;
  public pageCustomActions:   Array<PoPageDynamicTableCustomAction> = [];
  public tableCustomActions:  Array<PoPageDynamicTableCustomTableAction> = [];
  public fieldscolunasbrowse: Array<any> = [];
  public quickSearchWidth:    number = 0;
  public height:              number = 0;
  public serviceApi:          string = "";
  
  @ViewChild('dynamicTable', { static: true }) dynamicTable: PoPageDynamicTableComponent | null = null;

  getDynamicTableConfig(){
    this.pageCustomActions = this.dynamicTableConfig.pageCustomActions;
    this.tableCustomActions = this.dynamicTableConfig.tableCustomActions;
    this.fieldscolunasbrowse = this.dynamicTableConfig.fieldscolunasbrowse;
    this.quickSearchWidth = this.dynamicTableConfig.quickSearchWidth;
    this.height = this.dynamicTableConfig.height;
    this.actionsRight = this.dynamicTableConfig.actionsRight;
    this.serviceApi = this.dynamicTableConfig.serviceApi;
  }

}
