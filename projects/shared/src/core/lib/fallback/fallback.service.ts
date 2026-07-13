import { Injectable } from "@angular/core";
import type { UiSchema } from "../types";

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
        schema: this.getFallbackSchema(
          error instanceof Error ? error.message : "Parse error",
        ) as unknown as T,
        isFallback: true,
        error:
          error instanceof Error ? error.message : "Failed to parse schema",
      };
    }
  }

  getFallbackSchema(_errorMessage?: string): UiSchema {
    return {
      version: "1.0.0",
      schemaVersion: "1.0.0",
      pages: [
        {
          id: "error-page",
          name: "Schema Error",
          route: "/schema-error",
          meta: { title: "Schema Error", icon: undefined },
          layouts: [],
          canvasElements: [
            {
              id: "error-icon",
              componentId: "app-empty-state",
              props: {
                title: "Schema Error",
                message: _errorMessage ?? "Failed to load application schema.",
                variant: "danger",
                actionLabel: "Retry",
              },
              gridPosition: { column: 1, row: 1 },
            },
          ],
        },
      ],
      layouts: [],
      components: [],
    };
  }
}
