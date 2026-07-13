import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Add HttpClientModule
    import { HttpClientModule } from '@angular/common/http',
    import { HttpService } from 'tauri-front-shared',
    provideRouter(routes),
  ]
};