import {
  Component,
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./split-view.component.html",
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
