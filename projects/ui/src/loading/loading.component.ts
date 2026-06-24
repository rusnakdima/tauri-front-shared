import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";

export type LoadingVariant = "spinner" | "dots" | "pulse" | "skeleton";
export type LoadingSize = "sm" | "md" | "lg";

@Component({
  selector: "app-loading",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./loading.component.html",
  styleUrl: "./loading.component.css",
})
export class LoadingComponent {
  @Input() variant: LoadingVariant = "spinner";
  @Input() size: LoadingSize = "md";
}
