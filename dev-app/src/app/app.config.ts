import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideUnifiedApp } from "@tauri-front/shared";
import { ROUTES } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    ...provideUnifiedApp({
      appId: "dev-app",
      enableAnimations: false,
      enableHttpClient: true,
      enableZoneChangeDetection: true,
    }),
    provideRouter(ROUTES),
  ],
};
