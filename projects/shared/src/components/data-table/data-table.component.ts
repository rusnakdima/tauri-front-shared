import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";
import { parseJsonOrDefault } from "../../utils/json";

interface ColumnDef {
  key: string;
  name: string;
}
type RowData = Record<string, unknown>;

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"],
})
export class DataTableComponent {
  @Input() columns: string | ColumnDef[] = "[]";
  @Input() data: string | RowData[] = "[]";
  @Input() selectable = false;
  @Output() rowSelected = new EventEmitter<number>();
  selectedIndex = -1;

  get parsedColumns(): ColumnDef[] {
    return parseJsonOrDefault<ColumnDef>(this.columns);
  }

  get parsedData(): RowData[] {
    return parseJsonOrDefault<RowData>(this.data);
  }

  selectRow(index: number) {
    if (!this.selectable) return;
    this.selectedIndex = index;
    this.rowSelected.emit(index);
  }
}

registerSchemaComponent("app-data-table", DataTableComponent);
