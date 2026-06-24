import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClasses" [style]="containerStyles">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class GridContainerComponent {
  @Input() cols: string = '1fr';
  @Input() rows: string = 'auto';
  @Input() gap: string = '16px';
  @Input() smCols?: number;
  @Input() mdCols?: number;
  @Input() lgCols?: number;
  @Input() xlCols?: number;
  @Input() smGap?: string;
  @Input() mdGap?: string;
  @Input() lgGap?: string;
  @Input() xlGap?: string;

  get containerClasses(): string {
    const classes = ['grid'];

    if (this.cols.includes('fr') || this.cols === 'auto') {
      classes.push(`grid-cols-${this.cols.replace('fr', '')}`);
    } else if (!isNaN(Number(this.cols))) {
      classes.push(`grid-cols-${this.cols}`);
    }

    if (this.smCols) classes.push(`sm:grid-cols-${this.smCols}`);
    if (this.mdCols) classes.push(`md:grid-cols-${this.mdCols}`);
    if (this.lgCols) classes.push(`lg:grid-cols-${this.lgCols}`);
    if (this.xlCols) classes.push(`xl:grid-cols-${this.xlCols}`);

    return classes.join(' ');
  }

  get containerStyles(): Record<string, string> {
    const styles: Record<string, string> = {};

    if (this.cols.includes('fr')) {
      styles['grid-template-columns'] = this.cols;
    }
    if (this.rows.includes('fr') || this.rows === 'auto') {
      styles['grid-template-rows'] = this.rows;
    }

    const gapClass = this.gapToTailwindClass(this.gap);
    if (gapClass) {
      styles['gap'] = gapClass;
    }

    return styles;
  }

  private gapToTailwindClass(gap: string): string {
    const numericGap = parseInt(gap.replace(/[^\d]/g, ''), 10);
    const unit = gap.replace(/[\d]/g, '').trim();

    if (unit === 'px' || unit === '') {
      if (numericGap <= 4) return 'gap-1';
      if (numericGap <= 8) return 'gap-2';
      if (numericGap <= 12) return 'gap-3';
      if (numericGap <= 16) return 'gap-4';
      if (numericGap <= 20) return 'gap-5';
      if (numericGap <= 24) return 'gap-6';
      if (numericGap <= 32) return 'gap-8';
    }

    return gap;
  }
}
