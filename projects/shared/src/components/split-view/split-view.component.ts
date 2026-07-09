import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-split-view",
  standalone: true,
  template: `
    <div #container [class]="'split-container ' + direction">
      <div
        class="split-pane first"
        [style]="
          direction === 'horizontal'
            ? 'width: ' + split + '%; flex-grow: 0'
            : 'height: ' + split + '%; flex-grow: 0'
        "
      >
        <ng-content select="[slot=first]"></ng-content>
      </div>
      <div
        class="split-divider"
        [class.dragging]="isDragging"
        (mousedown)="onDividerMouseDown($event)"
      ></div>
      <div
        class="split-pane second"
        [style]="
          direction === 'horizontal'
            ? 'width: auto; flex: 1'
            : 'height: auto; flex: 1'
        "
      >
        <ng-content select="[slot=second]"></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
      .split-container {
        display: flex;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      .split-container.vertical {
        flex-direction: column;
      }
      .split-pane {
        overflow: auto;
        min-width: 0;
        min-height: 0;
      }
      .split-pane.first {
        flex-shrink: 0;
      }
      .split-container.horizontal .split-pane.first {
        height: 100%;
      }
      .split-container.vertical .split-pane.first {
        width: 100%;
      }
      .split-divider {
        flex-shrink: 0;
        background: var(--border-color);
        transition: background 0.15s;
        position: relative;
        z-index: 1;
      }
      .split-container.horizontal .split-divider {
        width: 6px;
        cursor: col-resize;
      }
      .split-container.vertical .split-divider {
        height: 6px;
        cursor: row-resize;
      }
      .split-divider:hover,
      .split-divider.dragging {
        background: var(--accent);
      }
      .split-divider::after {
        content: "";
        position: absolute;
        background: transparent;
      }
      .horizontal .split-divider::after {
        top: 0;
        bottom: 0;
        left: -4px;
        right: -4px;
      }
      .vertical .split-divider::after {
        left: 0;
        right: 0;
        top: -4px;
        bottom: -4px;
      }
    `,
  ],
})
export class SplitViewComponent implements OnDestroy {
  @ViewChild("container") containerEl!: ElementRef<HTMLElement>;
  @Input() direction: "horizontal" | "vertical" = "horizontal";
  @Input() split = 50;
  @Input() minFirst = 20;
  @Input() minSecond = 20;
  @Output() splitChanged = new EventEmitter<number>();

  isDragging = false;
  private onMouseMove: ((e: MouseEvent) => void) | null = null;
  private onMouseUp: (() => void) | null = null;

  onDividerMouseDown(e: MouseEvent) {
    e.preventDefault();
    this.isDragging = true;

    this.onMouseMove = (moveEvent: MouseEvent) => {
      if (!this.isDragging) return;
      const container = this.containerEl?.nativeElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      let percentage: number;
      if (this.direction === "horizontal") {
        percentage = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      } else {
        percentage = ((moveEvent.clientY - rect.top) / rect.height) * 100;
      }
      this.split = Math.max(
        this.minFirst,
        Math.min(100 - this.minSecond, percentage),
      );
      this.splitChanged.emit(this.split);
    };

    this.onMouseUp = () => {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.onMouseMove!);
      document.removeEventListener("mouseup", this.onMouseUp!);
      this.onMouseMove = null;
      this.onMouseUp = null;
    };

    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  ngOnDestroy() {
    if (this.onMouseMove)
      document.removeEventListener("mousemove", this.onMouseMove);
    if (this.onMouseUp) document.removeEventListener("mouseup", this.onMouseUp);
  }
}

registerSchemaComponent("app-split-view", SplitViewComponent);
