import { PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from "@po-ui/ng-templates";

export interface IdynamicTable {
    title: string;
    actionsRight: boolean;
    pageCustomActions: Array<PoPageDynamicTableCustomAction>
    tableCustomActions: Array<PoPageDynamicTableCustomTableAction>
    fieldscolunasbrowse: Array<any>;
    quickSearchWidth: number;
    height: number;
    serviceApi: any;
}
