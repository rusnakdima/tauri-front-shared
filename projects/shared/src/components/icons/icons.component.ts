import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

// Material Icons mapping - using Google Material Icons names
const MI_ICONS: Record<string, string> = {
  // Navigation
  home: "home",
  menu: "menu",
  close: "close",
  check: "check",
  "chevron-down": "expand_more",
  "chevron-right": "chevron_right",
  // Actions
  edit: "edit",
  delete: "delete",
  add: "add",
  search: "search",
  undo: "undo",
  redo: "redo",
  remove: "remove",
  fit_screen: "fullscreen",
  grid: "grid_view",
  grid_on: "grid_view",
  zoom_in: "zoom_in",
  zoom_out: "zoom_out",
  // Status
  info: "info",
  warning: "warning",
  error: "error",
  success: "check_circle",
  // Content
  user: "person",
  settings: "settings",
  star: "star",
  heart: "favorite",
  // Media
  image: "image",
  camera: "camera_alt",
  // Files
  file: "description",
  folder: "folder",
  // Misc
  sun: "light_mode",
  moon: "dark_mode",
  download: "download",
  upload: "upload",
  copy: "content_copy",
  // Translation & Input
  translate: "translate",
  keyboard: "keyboard",
  // Additional
  search_off: "search_off",
  swap_vert: "swap_vert",
  expand_more: "expand_more",
  dark_mode: "dark_mode",
  light_mode: "light_mode",
  arrow_back: "arrow_back",
  arrow_forward: "arrow_forward",
  first_page: "first_page",
  last_page: "last_page",
  chevron_left: "chevron_left",
  chevron_right: "chevron_right",
  content_copy: "content_copy",
  clear: "close",
  language: "translate",
  xmark: "close",
};

@Component({
  selector: "app-icon",
  standalone: true,
  imports: [],
  templateUrl: "./icons.component.html",
  styleUrls: ["./icons.component.scss"],
})
export class IconComponent {
  @Input() icon = "";
  @Input() size = 24;
  @Input() classes = "";

  get materialIcon(): string {
    return MI_ICONS[this.icon] || MI_ICONS["info"] || "help";
  }
}
