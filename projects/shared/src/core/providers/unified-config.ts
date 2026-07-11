import {
  type EnvironmentProviders,
  type Provider,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient } from "@angular/common/http";
import { provideZoneChangeDetection } from "@angular/core";

export interface UnifiedAppConfig {
  appId?: string;
  enableAnimations?: boolean;
  enableHttpClient?: boolean;
  enableBrowserErrorListeners?: boolean;
  enableZoneChangeDetection?: boolean;
  extraProviders?: (Provider | EnvironmentProviders)[];
}

const DEFAULT_CONFIG: UnifiedAppConfig = {
  enableAnimations: false,
  enableHttpClient: false,
  enableBrowserErrorListeners: true,
  enableZoneChangeDetection: true,
};

export type AppProvider = Provider | EnvironmentProviders;

/**
 * Standardized Angular providers for all Tauri apps.
 *
 * Usage:
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     ...provideUnifiedApp({ appId: 'my-app' }),
 *     // App-specific providers only
 *   ],
 * };
 * ```
 */
export function provideUnifiedApp(config?: UnifiedAppConfig): AppProvider[] {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const providers: AppProvider[] = [];

  if (cfg.enableBrowserErrorListeners) {
    providers.push(provideBrowserGlobalErrorListeners());
  }

  if (cfg.enableAnimations) {
    providers.push(provideAnimationsAsync());
  }

  if (cfg.enableHttpClient) {
    providers.push(provideHttpClient());
  }

  if (cfg.enableZoneChangeDetection) {
    providers.push(provideZoneChangeDetection({ eventCoalescing: true }));
  }

  if (cfg.extraProviders?.length) {
    providers.push(...cfg.extraProviders);
  }

  return providers;
}
