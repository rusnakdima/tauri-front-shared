import { Component } from "@angular/core";
import { SchemaRouteViewerComponent } from "@tauri-front/shared";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SchemaRouteViewerComponent],
  template: `<lib-schema-route-viewer></lib-schema-route-viewer>`,
  styles: [`:host { display: block; width: 100%; }`],
})
export class AppComponent {}
