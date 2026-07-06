import { Injectable } from "@angular/core";
import type { UiSchema, Page, CanvasElement } from "../types";

export interface FallbackResult<T> {
  schema: T;
  isFallback: boolean;
  error?: string;
}

@Injectable({ providedIn: "root" })
export class FallbackService {
  parseSchemaWithFallback<T>(jsonString: string): FallbackResult<T> {
    try {
      const schema = JSON.parse(jsonString) as T;
      return { schema, isFallback: false };
    } catch (error) {
      return {
        schema: this.getFallbackSchema(error instanceof Error ? error.message : "Parse error") as unknown as T,
        isFallback: true,
        error: error instanceof Error ? error.message : "Failed to parse schema",
      };
    }
  }

  getFallbackSchema(errorMessage?: string): UiSchema {
    return {
      schemaVersion: "1.0.0",
      app: {
        id: "fallback",
        name: "Fallback",
        version: "1.0.0",
        description: errorMessage || "Fallback schema",
        identifier: "com.fallback.app",
        settings: {
          defaultLocale: "en",
          supportedLocales: ["en"],
          tailwindPreset: "default",
          theme: "default",
          themes: [],
          colorMode: "system",
        },
      },
      pages: [
        {
          id: "error-page",
          name: "Error",
          route: "/error",
          layout: null,
          meta: { title: "Error", icon: null, breadcrumb: [] },
          sections: {},
          canvasElements: [],
        },
      ],
      layouts: [],
      components: [],
      sharedComponents: [],
      services: [],
      modules: [],
      i18N: { locales: {} },
    };
  }
}
