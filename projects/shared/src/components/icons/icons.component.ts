import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

// Font Awesome icon mapping - no MatIcon, no SVG injection
const FA_ICONS: Record<string, string> = {
  // Navigation
  home: "fa-home",
  menu: "fa-bars",
  close: "fa-xmark",
  check: "fa-check",
  "chevron-down": "fa-chevron-down",
  "chevron-right": "fa-chevron-right",
  // Actions
  edit: "fa-pen",
  delete: "fa-trash",
  add: "fa-plus",
  search: "fa-magnifying-glass",
  undo: "fa-rotate-left",
  redo: "fa-rotate-right",
  remove: "fa-minus",
  fit_screen: "fa-expand",
  grid: "fa-table-cells",
  grid_on: "fa-table-cells",
  zoom_in: "fa-plus",
  zoom_out: "fa-minus",
  // Status
  info: "fa-circle-info",
  warning: "fa-triangle-exclamation",
  error: "fa-circle-xmark",
  success: "fa-circle-check",
  // Content
  user: "fa-user",
  settings: "fa-gear",
  star: "fa-star",
  heart: "fa-heart",
  // Media
  image: "fa-image",
  camera: "fa-camera",
  // Files
  file: "fa-file",
  folder: "fa-folder",
  // Misc
  sun: "fa-sun",
  moon: "fa-moon",
  download: "fa-download",
  upload: "fa-upload",
  copy: "fa-copy",
  // Translation & Input
  translate: "fa-language",
  keyboard: "fa-keyboard",
  // Additional
  search_off: "fa-magnifying-glass-minus",
  swap_vert: "fa-up-down",
  expand_more: "fa-chevron-down",
  dark_mode: "fa-moon",
  light_mode: "fa-sun",
  arrow_back: "fa-arrow-left",
  arrow_forward: "fa-arrow-right",
  first_page: "fa-angles-left",
  last_page: "fa-angles-right",
  chevron_left: "fa-chevron-left",
  chevron_right: "fa-chevron-right",
  content_copy: "fa-copy",
  clear: "fa-xmark",
};

@Component({
  selector: "app-icon",
  standalone: true,
  imports: [],
  templateUrl: "./icons.component.html",
  styleUrls: ["./icons.component.css"],
})
export class IconComponent {
  @Input() icon = "";
  @Input() size = 24;

  get faClass(): string {
    const faIcon = FA_ICONS[this.icon] || FA_ICONS["info"];
    return `fa-fw ${faIcon}`;
  }
}

registerSchemaComponent("app-icon", IconComponent);
