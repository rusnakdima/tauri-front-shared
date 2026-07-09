import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

interface ColumnDef {
  key: string;
  name: string;
}
type RowData = Record<string, unknown>;

@Component({
  selector: "app-data-table",
  standalone: true,
  template: `
    <table>
      <thead>
        <tr>
          @if (selectable) {
            <th class="radio-cell"></th>
          }
          @for (col of parsedColumns; track col.key) {
            <th>{{ col.name }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of parsedData; track row; let idx = $index) {
          <tr
            [class.selectable]="selectable"
            [class.selected]="selectedIndex === idx"
            (click)="selectRow(idx)"
          >
            @if (selectable) {
              <td>
                <span
                  class="radio"
                  [class.checked]="selectedIndex === idx"
                ></span>
              </td>
            }
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
      tr {
        cursor: default;
      }
      tr:hover td {
        background-color: var(--bg-hover);
      }
      tr.selected td {
        background-color: var(--accent);
        color: var(--text-on-accent);
      }
      tr.selectable {
        cursor: pointer;
      }
      .radio-cell {
        width: 2rem;
      }
      .radio {
        width: 1rem;
        height: 1rem;
        border: 2px solid var(--border-color);
        border-radius: 50%;
        display: inline-block;
      }
      tr.selected .radio {
        border-color: var(--text-on-accent);
        background-color: var(--text-on-accent);
      }
    `,
  ],
})
export class DataTableComponent {
  @Input() columns: string | ColumnDef[] = "[]";
  @Input() data: string | RowData[] = "[]";
  @Input() selectable = false;
  @Output() rowSelected = new EventEmitter<number>();
  selectedIndex = -1;

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

  selectRow(index: number) {
    if (!this.selectable) return;
    this.selectedIndex = index;
    this.rowSelected.emit(index);
  }
}

registerSchemaComponent("app-data-table", DataTableComponent);
