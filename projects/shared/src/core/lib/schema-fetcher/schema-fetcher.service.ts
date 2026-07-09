import { Injectable, Optional } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import type { UiSchema } from "../types";

export type SchemaLoadMode = "embedded" | "http" | "tauri";

export interface SchemaLoadOptions {
  mode: SchemaLoadMode;
  source: string;
  fallbackOptions?: SchemaLoadOptions;
}

@Injectable({ providedIn: "root" })
export class SchemaFetcherService {
  constructor(@Optional() private http: HttpClient | null) {}

  async loadSchema(options: SchemaLoadOptions): Promise<UiSchema> {
    try {
      switch (options.mode) {
        case "embedded":
          return this.loadEmbedded(options.source);
        case "http":
          return this.loadHttp(options.source);
        case "tauri":
          return this.loadTauri(options.source);
        default:
          throw new Error(`Unknown schema load mode: ${options.mode}`);
      }
    } catch (primaryError) {
      console.error("SchemaFetcher: Primary schema load failed:", primaryError);
      if (options.fallbackOptions) {
        console.warn("SchemaFetcher: Attempting fallback schema...");
        try {
          return await this.loadSchema(options.fallbackOptions);
        } catch (fallbackError) {
          console.error(
            "SchemaFetcher: Fallback schema also failed:",
            fallbackError,
          );
          throw primaryError;
        }
      }
      throw primaryError;
    }
  }

  private async loadEmbedded(source: string): Promise<UiSchema> {
    try {
      const response = await fetch(source);
      if (!response.ok) {
        throw new Error(`Failed to load embedded schema: ${response.status}`);
      }
      const data = await response.json();
      return data as UiSchema;
    } catch (err) {
      console.error("SchemaFetcher: Error loading embedded schema:", err);
      throw err;
    }
  }

  private async loadHttp(url: string): Promise<UiSchema> {
    if (!this.http) {
      throw new Error(
        "HttpClient not available. Import HttpClientModule or provide provideHttpClient().",
      );
    }
    return firstValueFrom(this.http.get<UiSchema>(url));
  }

  private async loadTauri(commandName: string): Promise<UiSchema> {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const schema = await invoke<UiSchema>(commandName);
      return schema;
    } catch (err) {
      console.error("SchemaFetcher: Error loading schema via Tauri:", err);
      throw err;
    }
  }

  async loadSchemaFromFile(file: File): Promise<UiSchema> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          resolve(data as UiSchema);
        } catch (err) {
          reject(new Error("Invalid schema JSON file"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }

  validateSchema(schema: unknown): schema is UiSchema {
    if (!schema || typeof schema !== "object") return false;
    const s = schema as Record<string, unknown>;
    return (
      typeof s["schemaVersion"] === "string" &&
      typeof s["app"] === "object" &&
      Array.isArray(s["pages"])
    );
  }
}
