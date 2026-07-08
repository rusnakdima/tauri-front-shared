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
      version: "1.0.0",
      pages: [
        {
          id: "error-page",
          name: "Schema Error",
          route: "/schema-error",
          meta: { title: "Schema Error", icon: null },
          layouts: [],
          canvasElements: [],
        },
      ],
      layouts: [],
    };
  }
}
