import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-grid-area",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./grid-area.component.html",
  styleUrl: "./grid-area.component.css",
})
export class GridAreaComponent {
  @Input() name: string = "";
  @Input() colStart?: number;
  @Input() colEnd?: number;
  @Input() rowStart?: number;
  @Input() rowEnd?: number;
}
