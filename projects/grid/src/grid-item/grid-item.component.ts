import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid-item',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`:host { display: block; }`]
})
export class GridItemComponent {
  @Input() col: number | string = 'auto';
  @Input() row: number | string = 'auto';
  @Input() colSpan?: number;
  @Input() rowSpan?: number;
  @Input() colStart?: number;
  @Input() rowStart?: number;
  @Input() area?: string;

  get gridStyles(): Record<string, string> {
    const styles: Record<string, string> = {};

    if (this.area) {
      styles['grid-area'] = this.area;
    } else {
      if (this.colStart) styles['grid-column-start'] = String(this.colStart);
      if (this.colSpan) styles['grid-column'] = `span ${this.colSpan}`;
      else if (this.col !== 'auto') styles['grid-column'] = String(this.col);

      if (this.rowStart) styles['grid-row-start'] = String(this.rowStart);
      if (this.rowSpan) styles['grid-row'] = `span ${this.rowSpan}`;
      else if (this.row !== 'auto') styles['grid-row'] = String(this.row);
    }

    return styles;
  }
}
