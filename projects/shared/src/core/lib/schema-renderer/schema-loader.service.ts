import { Injectable } from "@angular/core";
import type { UiSchema, ValidationResult, ValidationError } from "./types";
import { logger } from "../../../../utils/logger";

@Injectable({ providedIn: "root" })
export class SchemaLoaderService {
  private appId = "zenithdb";

  setAppId(id: string) {
    this.appId = id;
  }

  async loadSchema(
    mode: "file" | "cloud" | "embedded",
    source?: string,
  ): Promise<UiSchema> {
    switch (mode) {
      case "embedded":
        return this.loadEmbedded(source || "/assets/schema.json");
      case "file":
        if (!source)
          throw new Error("File path must be provided for file mode");
        return this.loadFromFile(source);
      case "cloud":
        if (!source)
          throw new Error("Endpoint must be provided for cloud mode");
        return this.loadFromCloud(source);
    }
  }

  async loadFromFile(path: string): Promise<UiSchema> {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const content = await invoke<string>("read_text_file", { path });
      const schema = JSON.parse(content) as unknown;
      const result = this.validateSchema(schema);
      if (!result.valid) {
        throw new Error(
          `Schema validation failed: ${result.errors.map((e) => e.message).join(", ")}`,
        );
      }
      return schema as UiSchema;
    } catch (e) {
      throw new Error(`Failed to load schema from file: ${e}`);
    }
  }

  async loadFromCloud(endpoint: string): Promise<UiSchema> {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const schema = (await response.json()) as unknown;
    const result = this.validateSchema(schema);
    if (!result.valid) {
      throw new Error(
        `Schema validation failed: ${result.errors.map((e) => e.message).join(", ")}`,
      );
    }
    return schema as UiSchema;
  }

  async loadEmbedded(source = "/assets/schema.json"): Promise<UiSchema> {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`Failed to load embedded schema: ${response.statusText}`);
    }
    const schema = (await response.json()) as unknown;
    const result = this.validateSchema(schema);
    if (!result.valid) {
      throw new Error(
        `Schema validation failed: ${result.errors.map((e) => e.message).join(", ")}`,
      );
    }
    return schema as UiSchema;
  }

  async loadSchemaLocalFirst(
    designerEndpoint?: string,
  ): Promise<UiSchema | null> {
    const { invoke } = await import("@tauri-apps/api/core");

    try {
      const cached = await invoke<{ status: string; data: UiSchema }>(
        "get_schema_local_first",
        {
          appId: this.appId,
        },
      );
      if (cached?.status === "success" && cached.data) {
        logger.log("[SchemaLoader] Loaded from local cache");
        return cached.data;
      }
    } catch (e) {
      logger.warn("[SchemaLoader] Local cache read failed:", e);
    }

    if (designerEndpoint) {
      try {
        const cloud = await invoke<{ status: string; data: UiSchema }>(
          "sync_schema_from_cloud",
          {
            appId: this.appId,
            designerEndpoint,
          },
        );
        if (cloud?.status === "success" && cloud.data) {
          logger.log("[SchemaLoader] Synced from cloud via Designer");
          await invoke("save_schema_local", {
            appId: this.appId,
            schema: cloud.data,
          });
          return cloud.data;
        }
      } catch (e) {
        logger.warn("[SchemaLoader] Cloud sync failed:", e);
      }
    }

    logger.warn("[SchemaLoader] Using embedded fallback schema");
    return this.loadEmbedded();
  }

  validateSchema(schema: unknown): ValidationResult {
    const errors: ValidationError[] = [];

    if (!schema || typeof schema !== "object") {
      errors.push({
        path: "$",
        message: "Schema must be an object",
        severity: "error",
      });
      return { valid: false, errors };
    }

    const s = schema as Record<string, unknown>;

    if (typeof s.schemaVersion !== "string") {
      errors.push({
        path: ".schemaVersion",
        message: "Schema must have a schemaVersion string",
        severity: "error",
      });
    }

    if (!s.pages || !Array.isArray(s.pages)) {
      errors.push({
        path: ".pages",
        message: "Schema must have a pages array",
        severity: "error",
      });
    }

    if (!s.components || !Array.isArray(s.components)) {
      errors.push({
        path: ".components",
        message: "Schema must have a components array",
        severity: "error",
      });
    }

    return { valid: errors.length === 0, errors };
  }
}
