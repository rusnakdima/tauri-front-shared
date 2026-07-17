import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

interface ColumnDef {
  key: string;
  name: string;
}
type RowData = Record<string, unknown>;

@Component({
  selector: "app-table-view",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./table-view.component.html",
})
export class TableViewComponent {
  @Input() columns: string | ColumnDef[] = "[]";
  @Input() data: string | RowData[] = "[]";

  get parsedColumns(): ColumnDef[] {
    return parseJsonOrDefault<ColumnDef>(this.columns);
  }

  get parsedData(): RowData[] {
    return parseJsonOrDefault<RowData>(this.data);
  }
}

registerSchemaComponent("app-table-view", TableViewComponent);
