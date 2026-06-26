import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square" | "rounded";

@Component({
  selector: "app-avatar",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./avatar.component.html",
  styleUrl: "./avatar.component.css",
})
export class AvatarComponent {
  @Input() src: string | null = null;
  @Input() name: string = "";
  @Input() size: AvatarSize = "md";
  @Input() shape: AvatarShape = "circle";

  get initials(): string {
    if (!this.name) return "?";
    const parts = this.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  }

  get avatarClass(): string {
    const classes = [
      "app-avatar",
      `app-avatar-${this.size}`,
      `app-avatar-${this.shape}`,
    ];
    return classes.join(" ");
  }
}
