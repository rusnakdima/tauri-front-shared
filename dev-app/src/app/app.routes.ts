import { Routes } from "@angular/router";

export const ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/playground/playground.component").then(
        (m) => m.PlaygroundComponent,
      ),
  },
  {
    path: "schema-error",
    loadComponent: () =>
      import("./pages/schema-error/schema-error.component").then(
        (m) => m.SchemaErrorComponent,
      ),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./pages/not-found/not-found.component").then(
        (m) => m.NotFoundComponent,
      ),
  },
];
