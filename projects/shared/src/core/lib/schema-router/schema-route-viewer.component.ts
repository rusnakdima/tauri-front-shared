import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
  computed,
  effect,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { SchemaRouterService } from "./schema-router.service";
import { SchemaRendererService } from "../schema-renderer/schema-renderer.service";
import { SchemaElementComponent } from "./schema-element.component";
import type { Page } from "../types";

@Component({
  selector: "lib-schema-route-viewer",
  standalone: true,
  imports: [SchemaElementComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./schema-route-viewer.component.html",
  styleUrl: "./schema-route-viewer.component.css",
})
export class SchemaRouteViewerComponent implements OnInit, OnChanges {
  @Input() route = "";
  private router = inject(SchemaRouterService);
  private renderer = inject(SchemaRendererService);
  readonly page = computed(() => this.router.currentPage());

  constructor() {
    // Sync router params to the data binding resolver when params change
    effect(() => {
      const params = this.router.params();
      if (Object.keys(params).length > 0) {
        this.renderer.setParams(params);
      }
    });
  }

  ngOnInit() {
    if (this.route) this.router.navigate(this.route);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["route"]) this.router.navigate(this.route);
  }
}
