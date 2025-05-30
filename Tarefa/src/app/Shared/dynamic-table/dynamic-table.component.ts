import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PoPageDynamicTableComponent, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { IdynamicTable } from '../../Interface/idynamic-table';
import { PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [PoPageDynamicTableModule, PoPageModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css',
})
export class DynamicTableComponent implements OnChanges {

  @Input() dynamicTableConfig: IdynamicTable = {
    actionsRight: true,
    pageCustomActions: [],
    tableCustomActions: [],
    fieldscolunasbrowse: [],
    quickSearchWidth: 3,
    height: 300,
    serviceApi: null,
  };

  public actionsRight: boolean = true;
  public pageCustomActions: Array<PoPageDynamicTableCustomAction> = [];
  public tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [];
  public fieldscolunasbrowse: Array<any> = [];
  public quickSearchWidth: number = 0;
  public height: number = 0;
  public serviceApi: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['dynamicTableConfig'] &&
      changes['dynamicTableConfig'].currentValue
    ) {
      const config = this.dynamicTableConfig;
      this.pageCustomActions = config.pageCustomActions;
      this.tableCustomActions = config.tableCustomActions;
      this.fieldscolunasbrowse = config.fieldscolunasbrowse;
      this.quickSearchWidth = config.quickSearchWidth;
      this.height = config.height;
      this.actionsRight = config.actionsRight;
      this.serviceApi = config.serviceApi;
    }
  }

  @ViewChild('dynamicTable', { static: true })dynamicTable: PoPageDynamicTableComponent | null = null;
}
