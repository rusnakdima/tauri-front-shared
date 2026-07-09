import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

interface ColumnDef {
  key: string;
  name: string;
}
type RowData = Record<string, unknown>;

@Component({
  selector: "app-table-view",
  standalone: true,
  template: `
    <table>
      <thead>
        <tr>
          @for (col of parsedColumns; track col.key) {
            <th>{{ col.name }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of parsedData; track row) {
          <tr>
            @for (col of parsedColumns; track col.key) {
              <td>{{ row[col.key] }}</td>
            }
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: [
    `
      :host {
        display: block;
        overflow-x: auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
      }
      th {
        text-align: left;
        padding: 0.75rem 1rem;
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        font-weight: 600;
        border-bottom: 1px solid var(--border-color);
      }
      td {
        padding: 0.75rem 1rem;
        color: var(--text-primary);
        border-bottom: 1px solid var(--border-color);
      }
      tr:hover td {
        background-color: var(--bg-hover);
      }
    `,
  ],
})
export class TableViewComponent {
  @Input() columns: string | ColumnDef[] = "[]";
  @Input() data: string | RowData[] = "[]";

  get parsedColumns(): ColumnDef[] {
    if (Array.isArray(this.columns)) return this.columns;
    try {
      return JSON.parse(this.columns);
    } catch {
      return [];
    }
  }

  get parsedData(): RowData[] {
    if (Array.isArray(this.data)) return this.data;
    try {
      return JSON.parse(this.data);
    } catch {
      return [];
    }
  }
}

registerSchemaComponent("app-table-view", TableViewComponent);
