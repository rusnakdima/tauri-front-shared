import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

// MDI Font icon mapping - using @mdi/font icon names (kebab-case)
const MI_ICONS: Record<string, string> = {
  // Navigation
  home: "home",
  menu: "menu",
  close: "close",
  check: "check",
  "chevron-down": "chevron-down",
  "chevron-right": "chevron-right",
  // Actions
  edit: "pencil",
  delete: "delete",
  add: "plus",
  search: "magnify",
  undo: "undo",
  redo: "redo",
  remove: "minus",
  fit_screen: "fullscreen",
  grid: "view-grid",
  grid_on: "view-grid",
  zoom_in: "magnify-plus",
  zoom_out: "magnify-minus",
  // Status
  info: "information",
  warning: "alert",
  error: "alert-circle",
  success: "check-circle",
  // Content
  user: "account",
  settings: "cog",
  star: "star",
  heart: "heart",
  // Media
  image: "image",
  camera: "camera",
  // Files
  file: "file-document",
  folder: "folder",
  // Misc
  sun: "white-balance-sunny",
  moon: "moon-waning-crescent",
  download: "download",
  upload: "upload",
  copy: "content-copy",
  // Translation & Input
  translate: "translate",
  keyboard: "keyboard",
  // Additional
  search_off: "magnify-close",
  swap_vert: "swap-vertical",
  expand_more: "chevron-down",
  dark_mode: "weather-night",
  light_mode: "white-balance-sunny",
  arrow_back: "arrow-left",
  arrow_forward: "arrow-right",
  first_page: "page-first",
  last_page: "page-last",
  chevron_left: "chevron-left",
  chevron_right: "chevron-right",
  content_copy: "content-copy",
  clear: "close",
  language: "web",
  xmark: "close",
  // Schema icons
  "alert-triangle": "alert",
  globe: "web",
};

@Component({
  selector: "app-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <span class="material-symbols-rounded" [style.font-size.px]="size">{{
      icon
    }}</span>
  `,
})
export class IconComponent {
  @Input() icon = "";
  @Input() size = 24;
  @Input() classes = "";
  @Input() spin = false;

  get iconName(): string {
    return MI_ICONS[this.icon] || MI_ICONS["info"] || "information";
  }

  get sizeClass(): string {
    if (this.size === 16) return "text-[16px]";
    if (this.size === 18) return "text-[18px]";
    if (this.size === 20) return "text-[20px]";
    if (this.size === 24) return "text-[24px]";
    if (this.size === 32) return "text-[32px]";
    if (this.size === 48) return "text-[48px]";
    return `text-[${this.size}px]`;
  }
}
