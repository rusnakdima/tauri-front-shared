import "@tauri-front/shared";
import { loadStyleVariant } from "@tauri-front/shared";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

loadStyleVariant("material-design-v3").then(() => {
  bootstrapApplication(AppComponent, appConfig).catch((err) => {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error(err);
  });
});
