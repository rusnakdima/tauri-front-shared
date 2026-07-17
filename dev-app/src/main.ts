import "@tauri-front/shared";
import { loadStyleVariant } from "@tauri-front/shared";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

loadStyleVariant("material-design-v3").then(() => {
  bootstrapApplication(AppComponent, appConfig)
    .then(() => {
      // Initialize Flowbite JS for dropdowns/modals/FAB
      import("flowbite").then((m) => m.initFlowbite());
    })
    .catch((err) => {
      console.error(err);
    });
});
